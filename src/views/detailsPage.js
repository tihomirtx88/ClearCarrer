import { deleteById, didUserDonation, donationOffer, getOfferById, getTotalDonationCount } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (offer, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate) => html`
    <!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${offer.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">${totalDonationCount}</strong></p>
    
            
            <div id="action-buttons">
            ${isLoggedIn && isOwner 
                     ? html` <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                     <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                     `
                     : null          
             }
            ${isLoggedIn && !isOwner && didUserDonate == 0 ? html`<a @click=${onClickDonation} href="javascript:void(0)" id="apply-btn">Apply</a>` : nothing}  
            </div>
        </div>
    </section>
`;



export async function detailsPage(ctx) {
    const offer = await getOfferById(ctx.params.id)
    const offerId = ctx.params.id;
    const user = ctx.user;
    
    let userId;
    let totalDonationCount;
    let didUserDonate;
    if (user != null) {
        userId = user.id
        didUserDonate = await didUserDonation(offerId, userId);
        
    }


    const userData = getUserData();
    const isOwner = userData && offer._ownerId == userData.id;
    const isLoggedIn = userData ? true : false;

    totalDonationCount = await getTotalDonationCount(offerId);
    ctx.render(detailsTemplate(offer, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));
    
    async function onClickDonation() {
        const donation = {
            offerId,
        }
        await donationOffer(donation);

        totalDonationCount = await getTotalDonationCount(offerId);
        didUserDonate = await didUserDonation(offerId, userId);
        ctx.render(detailsTemplate(offer, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));
    }

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this offer FOREVER?`);

        if (choice) {
            await deleteById(ctx.params.id);
            ctx.page.redirect(`/catalog`);
        }
    }


}