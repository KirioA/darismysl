import Link from 'next/link';
import { Drift, Sparkles, Wordmark } from './decor';
import { Snowflake } from './art';
import { COMPANY } from './company';

export default function SiteFooter({ home = false }: { home?: boolean }) {
  const base = home ? '' : '/';
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" aria-label="Контакты и реквизиты">
      <Drift fill="#2b070d" />
      <div className="section-bg" aria-hidden="true">
        <Snowflake className="bg-flake gold" style={{ right: '3%', top: '10%', width: 170, transform: 'rotate(12deg)' }} />
        <Snowflake className="bg-flake gold" style={{ left: '-2%', bottom: '4%', width: 120, transform: 'rotate(-10deg)' }} />
        <Sparkles points={[[8, 24, 12], [26, 70, 10], [52, 16, 12], [70, 62, 10], [90, 30, 14], [96, 80, 10]]} />
      </div>
      <div className="wrap footer-grid">
        <div className="f-brand">
          <Link href="/" aria-label={`${COMPANY.brand} — на главную`}><Wordmark /></Link>
          <p>Подарочные наборы оптом. Собираем под ваш заказ и отгружаем к нужной дате.</p>
        </div>

        <nav className="f-col" aria-label="Разделы сайта">
          <h3>Разделы</h3>
          <ul>
            <li><a href={`${base}#how`}>Как заказать</a></li>
            <li><a href={`${base}#terms`}>Условия опта</a></li>
            <li><a href={`${base}#about`}>О нас и FAQ</a></li>
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
