var page_layout;

function error_handle(error, filename){
  document.getElementById('content-window').innerHTML = "Error " + error + " when trying to load " + filename + ".";
}

function get_content(filename, response, MIMEtype){ //load file <filename> from server and put content in <response>
  var xhr= new XMLHttpRequest();
  xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200){ // handle errors
      error_handle(this.status, filename);
      return;
    }
    response(this.responseText);
  };
  xhr.open('GET', filename, true);
  if(MIMEtype == "application/json"){
    xhr.overrideMimeType(MIMEtype);
  }
  xhr.send();
}

function set_content(content){
  document.getElementById('content-window').innerHTML = content;
}

function make_page(items_text){ //parse json and create menu
  let list = document.getElementById("menu-list");
  page_layout = JSON.parse(items_text);

  var i;
  for(i = 0; i < page_layout["menu-items"].length; i++){
    let item = document.createElement("li");
    let link;
    if(page_layout["menu-link-external"][i]){ //open external links in new tab and set link
      link = document.createElement("a");
      link.href = page_layout["menu-links"][i];
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }else{  //interal links should be loaded via index page
      link = document.createElement("a");
      if(i == 0){
        link.href = "";
      }else{
        link.href = "#" + page_layout["menu-links"][i];
      }
    }
    link.innerHTML = page_layout["menu-items"][i];
    link.classList.add('menu-link');
    item.appendChild(link);
    item.classList.add('menu-item');
    list.appendChild(item);

  }

  // now load content into content column
  load_content();
}


function load_content(){
  let urlPos = window.location.href.indexOf("#")+1;
  let url;
  if(urlPos == 0){
    url = page_layout["menu-links"][0];
  }else{
    url = window.location.href.substring(urlPos);
  }
  // load page content for window column
  get_content(url, set_content, "text/html");
}

// retrieve page layout and then build page
window.onload = function(){
  get_content("page-content.json", make_page, "application/json");
};

// load correct content when url changes
window.onhashchange = function(){
  load_content();
}
