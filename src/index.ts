import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, pluck } from 'rxjs/operators';
import { ELEMENT_IDENT } from './constants/elementIdents';
import { API_ENDPOINT } from './constants/endpounts';

const form = document.forms[0];
const observable = fromEvent(form, 'submit')

observable.subscribe((event) => {
  event.preventDefault();

  try {
    const formElements = (event.target as HTMLFormElement).elements;
    const query = ([...formElements] as HTMLInputElement[]).find((elem) => elem.id === ELEMENT_IDENT.QUERY_INPUT_ID);
    const type = ([...formElements] as HTMLInputElement[]).find((elem) => elem.name === ELEMENT_IDENT.RADIO_INPUT_NAME && elem.checked);
    const url = type.id === ELEMENT_IDENT.RADIO_GITHUB_ID
      ? API_ENDPOINT.GET_GITHUB(query.value)
      : API_ENDPOINT.GET_GITLAB(query.value);

    const data = ajax
      .getJSON(url)
      .pipe(
        map((res) => {
          if (Array.isArray(res)) return {items: res};
          return res;
        }),
        pluck('items')
      );

    data.subscribe(console.log);
  } catch (error) {
    console.log("🚀 observable.subscribe ~ error:", error)
  }
});
