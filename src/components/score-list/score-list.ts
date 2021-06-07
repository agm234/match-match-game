import { BaseComponent } from '../base-component';
import { DataBase } from '../../indexedDB';
import './score-list.scss';

interface MyRecord {
  name: string;
  lastname: string;
  email: string;
  score: number;
  id: IDBValidKey;
}
export class ScoreList extends BaseComponent {
  private readonly DataBase: DataBase;

  constructor() {
    super('ul', ['list']);
    this.DataBase = new DataBase();
  }

  async results(): Promise<void> {
    await this.DataBase.init('agm234', 1);
    const arr = await this.DataBase.readfiltred<MyRecord>();
    let li = '';
    for (let i = 0; i < arr.length; i += 1) {
      const note = arr[i];
      li += `
            <li class="playerScore">
            <div class="left_score">
            <div class="score_logo">
            </div>
            <div class="score_name_lastname">
            <span  class="name">${note.name} ${note.lastname}</span >
            <span class="email">${note.email}</span >
            </div>
            </div>
            <div class="right_score">
            <span class="score_name">Score: <span  class="score_value">${note.score}</span ></span >
            </div>
            `;
    }
    (<HTMLUListElement>document.querySelector('.list')).innerHTML = li;
  }
}
