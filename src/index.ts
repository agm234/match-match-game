import './styles.scss';
import { App } from './app';
import { HeaderBtnWrapper } from './components/header-btn-wrapper/header-btn-wrapper';
import { FormWrapper } from './components/form-wrapper/form-wrapper';
import { DataBase } from './indexedDB';

window.onload = () => {
  new App(document.body).routing();
  new HeaderBtnWrapper().show();
  new FormWrapper().form();
  const Idb = new DataBase();
  Idb.init('agm234', 1);
};
