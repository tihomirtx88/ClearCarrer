import { editOffer, getOfferById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (offer, onSubmit) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title}/>
                <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl}/>
                <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category}/>
                <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50" .value=${offer.description}></textarea>
                <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                    cols="50" .value=${offer.requirements}></textarea>
                <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary}/>
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>
`;



export async function editPage(ctx) {
    const offer = await getOfferById(ctx.params.id);

    ctx.render(editTemplate(offer, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const title = formData.get(`title`).trim();
        const imageUrl = formData.get(`imageUrl`).trim();
        const category = formData.get(`category`).trim();
        const description = formData.get(`description`).trim();
        const requirements = formData.get(`requirements`).trim();
        const salary = formData.get(`salary`).trim();

        if (title == `` || imageUrl == `` || category == `` || description == ``
        || requirements == `` || salary == ``) {
            return alert(`All fields are required!`);
        }

        await editOffer(ctx.params.id, {
            title,
            imageUrl, 
            category, 
            description, 
            requirements, 
            salary
          
        })

        ctx.page.redirect(`/details/` + ctx.params.id)
    }
}