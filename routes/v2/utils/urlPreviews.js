import fetch from 'node-fetch';

import parseHTML from 'node-html-parser';

async function getURLPreview(url){
  // TODO: Copy from your code for making url previews in A2 to make this 
  // a function that takes a url and returns an html string with a preview of that html
  let response = await fetch(url);
    try {
        if (response.ok) {
            let html = await response.text();
            let root = parseHTML.parse(html);
            let title = root.querySelector("title");
            let ogUrl = root.querySelector('meta[property="og:url"]');
            let ogTitle = root.querySelector('meta[property="og:title"]');
            let ogImage = root.querySelector('meta[property="og:image"]');
            let ogDescription = root.querySelector('meta[property="og:description"]');
            let ogSiteName = root.querySelector('meta[property="og:site_name"]');
            let preview = `
                    <div class="card preview-box">
                        <a href="${ogUrl? ogUrl.attributes.content : url}" class="card-title preview-title">${ogTitle? ogTitle.attributes.content : (title? title.text : url)}</a>
                        ${ogImage ? `<img src="${ogImage.attributes.content}" class="preview-image card-img-top">` : ``}
                        ${ogSiteName ? `From ${ogSiteName.attributes.content}` : ``}
                        ${ogDescription ? `<p class="card-text preview-description">${ogDescription.attributes.content}</p>` : ``}
                       
                        
                    </div>
                `;
            return preview;
        } else {
            return ("Error fetching url. " + response.status + " " + response.statusText);
        }
    } catch (error) {
        return ("Backend Error => " + error);
    }
}

export default getURLPreview;