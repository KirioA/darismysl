import { COMPANY } from './company';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Left column next to the lead form: what happens after sending, a second contact channel and a bit of art.
export default function AfterRequest() {
  return (
    <div className="after">
      <h3>Что будет после заявки</h3>
      <ol className="after-steps">
        <li><span>1</span><div><b>Свяжемся с вами</b><p>Уточним количество, бюджет и дату.</p></div></li>
        <li><span>2</span><div><b>Пришлём предложение</b><p>Подробный состав подарка и упаковки.</p></div></li>
        <li><span>3</span><div><b>Согласуем и соберём</b><p>Логотип, упаковка и бесплатная доставка по Беларуси.</p></div></li>
      </ol>
      <a className="btn btn-line after-ig" href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
        Примеры наборов в Instagram
      </a>
      <div className="after-art" aria-hidden="true">
        <img className="aa-box" src={`${base}/kit/box-open.webp`} alt="" />
        <img className="aa-gb" src={`${base}/kit/gingerbread.webp`} alt="" />
        <img className="aa-ball" src={`${base}/kit/bauble.webp`} alt="" />
      </div>
    </div>
  );
}
