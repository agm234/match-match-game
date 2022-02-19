import { BaseComponent } from '../base-component';
import './form-wrapper.scss';
import { DataBase } from '../../indexedDB';

interface MyRecord {
  name: string;
  lastname: string;
  email: string;
  score: number;
  id: IDBValidKey;
}

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
                            <input class="form_input" id="name" type="text" placeholder="First Name" max="30" 
                            required pattern="[^0-9(~ ! @ # $ % * () _ — + = | : ; '  < > , . ? / ^)]{1,30}">
                            </div>
                            <div class="popup_input_wrapper">
                            <label class="label" >Last Name</label>
                            <input class="form_input" id="lastname" type="text" placeholder="Last Name" max="30" 
                            pattern="[^0-9(~ ! @ # $ % * () _ — + = | : ; '  < > , . ? / ^)]{1,30}" required>
                            </div>
                            <div class="popup_input_wrapper">
                            <label class="label" >E-mail</label>
                            <input class="form_input" id="email" type="email" placeholder="E-mail" max="30" 
                            pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{2,}$" required>
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

  form(): void {
    const add = document.querySelector('.popup');
    const inputs = document.querySelectorAll('.form_input');
    inputs.forEach((el) => {
      el.addEventListener('invalid', () => {
        el.parentElement?.classList.add('invalid');
      });
      el.addEventListener('input', () => {
        el.parentElement?.classList.remove('invalid');
      });
    });
    add?.addEventListener('submit', async (event) => {
      event.preventDefault();
      document.querySelector('.cover')?.classList.toggle('hidden');
      document.querySelectorAll('.btn-reg__register').forEach((el) => {
        el.classList.add('hide');
      });
      document.querySelectorAll('.btn-reg__startgame').forEach((el) => {
        el.classList.remove('hide');
      });
      document.querySelectorAll('.avatar').forEach((el) => {
        document.querySelectorAll('.btn_reg').forEach((elem) => {
          if (!elem.classList.contains('activeBtns')) {
            el.classList.remove('hide');
          }
        });
      });
      document.body.classList.remove('noscrool');
      const Idb = new DataBase();
      await Idb.init('agm234', 1);
      await Idb.write<MyRecord>(this.UserData());
    });
  }

  UserData(): MyRecord {
    const name = document.getElementById('name');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const UserData = <MyRecord>{
      name: (name as HTMLInputElement).value,
      lastname: (lastname as HTMLInputElement).value,
      email: (email as HTMLInputElement).value,
      score: 0,
    };
    return UserData;
  }
}
