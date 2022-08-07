import { getAllOferts } from "../api/data.js";
import { html } from "../lib.js";

const catalogTemplate = (offerts) => html`
   <!-- Dashboard page -->
   <section id="dashboard">
          <h2>Job Offers</h2>

          <!-- Display a div with information about every post (if any)-->
          
          ${offerts.length == 0 
               ? html`<h2>No offers yet.</h2>`
               : offerts.map(offertCard)
            }     
          

          <!-- Display an h2 if there are no posts -->
          
        </section>
`;

const offertCard = (offert) => html`
<div class="offer">
            <img src=${offert.imageUrl} alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${offert.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${offert.salary}</span></p>
            <a class="details-btn" href="/details/${offert._id}">Details</a>
</div>
 `;

export async function catalogPage(ctx) {
    const offerts = await getAllOferts();
    ctx.render(catalogTemplate(offerts));
}