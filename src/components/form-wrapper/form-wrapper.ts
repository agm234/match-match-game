import { BaseComponent } from '../base-component';
import './form-wrapper.scss';
import { DataBase } from '../../indexedDB';

export class FormWrapper extends BaseComponent {
  constructor() {
    super('div', ['cover']);
    this.element.innerHTML = `
        <form class="popup" id="mypopup">
        <div class="popup_header">
                        <h1>Registr new Player</h1>
                    </div>
                    <div class="popup_wrapper">
                        <div class="popup_left">
                            <div class="popup_input_wrapper">
                            <label class="label" >First Name</label>
                            <input id="name" type="text" placeholder="First Name" required>
                            </div>
                            <div class="popup_input_wrapper">
                            <label class="label" >Last Name</label>
                            <input id="lastname" type="text" placeholder="Last Name" required>
                            </div>
                            <div class="popup_input_wrapper">
                            <label class="label" >E-mail</label>
                            <input id="email" type="email" placeholder="E-mail" required>
                            </div>
                        </div>
                        <div class="popup_right">
                            <div class="popup_avatar"></div>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="add">add user</button>
                        <button class="cansel" type="button">cansel</button>
                    </div>
    </form>
        `;
  }

  form() {
    const add = document.querySelector('.popup');
    add?.addEventListener('submit', async (event) => {
      event.preventDefault();
      document.querySelector('.cover')?.classList.toggle('hidden');
      document.querySelector('.btn-reg__register')?.classList.add('hide');
      document.querySelector('.btn-reg__startgame')?.classList.remove('hide');
      document.querySelector('.avatar')?.classList.remove('hide');
      console.log('asfasfaf');
      const Idb = new DataBase();
      await Idb.init('agm234', 1);
      await Idb.write(this.UserData());
    });
  }

  UserData() {
    console.log(this.element);
    const name = document.getElementById('name');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const UserData = {
      name: (name as HTMLInputElement).value,
      lastname: (lastname as HTMLInputElement).value,
      email: (email as HTMLInputElement).value,
      score: 0,
    };
    return UserData;
  }
}
