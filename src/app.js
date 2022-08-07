import { logout } from "./api/data.js";
import {page,render} from "./lib.js";
import { getUserData } from "./util.js";

import { catalogPage } from "./views/catalogPage.js";
import { createPage } from "./views/createPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";
import { homePage } from "./views/homePage.js";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "./views/registerPage.js";



const root = document.querySelector(`main`);

page(decorateContext);
page(`/`, homePage);
page(`/login`, loginPage);
page(`/register`, registerPage);
page(`/catalog`, catalogPage);
page(`/create`, createPage);
page(`/details/:id`, detailsPage);
page(`/edit/:id`, editPage);
// page(`/my-books`, myBooksPage);
// page(`/search`, searchPage);

updateUserNav();
page.start();


function decorateContext(ctx,next){
    ctx.render = (content) => render(content,root);
    ctx.updateUserNav = updateUserNav;
    ctx.user = getUserData();
    next();
}

document.getElementById(`logoutBtn`).addEventListener(`click`, onLogout);

export function updateUserNav(){
    const userData = getUserData();
    if (userData) {
        document.querySelector(`.user`).style.display = `inline-block`;
        document.querySelector(`.guest`).style.display = `none`;
        
    }else{
        document.querySelector(`.user`).style.display = `none`;
        document.querySelector(`.guest`).style.display = `inline-block`;
    }
}

function onLogout(){
   logout();
   updateUserNav();
   page.redirect(`/catalog`);
}

