import Link from 'next/link';
import { Wordmark } from './decor';
import { COMPANY } from './company';

export default function SiteFooter({ home = false }: { home?: boolean }) {
  const base = home ? '' : '/';
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" aria-label="Контакты и реквизиты">
      <div className="wrap footer-grid">
        <div className="f-brand">
          <Link href="/" aria-label={`${COMPANY.brand} — на главную`}><Wordmark tone="dark" /></Link>
          <p>Подарочные наборы оптом. Собираем под ваш заказ и отгружаем к нужной дате.</p>
        </div>

        <nav className="f-col" aria-label="Разделы сайта">
          <h3>Разделы</h3>
          <ul>
            <li><a href={`${base}#scenarios`}>Наборы</a></li>
            <li><a href={`${base}#order`}>Как заказать</a></li>
            <li><a href={`${base}#price`}>Из чего цена</a></li>
            <li><a href={`${base}#faq`}>Вопросы</a></li>
            <li><a href={`${base}#contact`}>Оставить заявку</a></li>
          </ul>
        </nav>

        <div className="f-col">
          <h3>Контакты</h3>
          <ul>
            <li><a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a></li>
            {COMPANY.email && <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>}
            <li className="f-address">Юридический адрес:<br />{COMPANY.address}</li>
          </ul>
        </div>

        <nav className="f-col" aria-label="Документы">
          <h3>Документы</h3>
          <ul>
            <li><Link href="/privacy">Политика в отношении обработки персональных данных</Link></li>
            <li><Link href="/consent">Согласие на обработку персональных данных</Link></li>
          </ul>
        </nav>
      </div>

      <div className="wrap f-legal">
        <p className="f-req">
          © {year} {COMPANY.name}. УНП {COMPANY.unp}. Место нахождения: {COMPANY.address}.
          {COMPANY.tradeRegister ? ` ${COMPANY.tradeRegister}.` : ''}
        </p>
        <p className="f-note">
          Информация на сайте носит информационный характер и не является публичной офертой.
          Состав наборов, цены и сроки согласовываются при оформлении заказа.
        </p>
      </div>
    </footer>
  );
}
