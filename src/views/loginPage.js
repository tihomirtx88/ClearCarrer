import { login } from "../api/api.js";
import { updateUserNav } from "../app.js";
import { html } from "../lib.js";


const loginTemplate = (onSubmit) => html`
  <!-- Login Page (Only for Guest users) -->
  <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`;

export function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get(`email`).trim();
        const password = formData.get(`password`).trim();

        if (email == `` || password == ``) {
            return alert(`All fields are required!`);
        }

        await login(email,password);
        updateUserNav();
        ctx.page.redirect(`/catalog`);
    }
}