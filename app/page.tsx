import FooterBackground from './footer-background';
import LeadForm from './lead-form';
import { Drift, Garland, Snow, Sparkles, Wordmark } from './decor';
import SiteFooter from './site-footer';
import {
  ArtDefs, CandyCane, FirBranch, GiftBox, IconBow, IconBox, IconCandy, IconCart, IconCheck, IconDoc,
  IconForm, IconStack, IconTruck, Lollipop, Snowflake, Star, WrappedCandy,
} from './art';

const STEPS = [
  { title: 'Заявка', text: 'Расскажите, что нужно: сколько наборов, на какой бюджет и к какой дате.', Icon: IconForm },
  { title: 'Состав', text: 'Подбираем конфеты, упаковку и наполнение под ваш повод и получателей.', Icon: IconCandy },
  { title: 'Согласование', text: 'Показываем состав набора, согласуем детали и стоимость.', Icon: IconCheck },
  { title: 'Сборка и отгрузка', text: 'Собираем наборы и отгружаем к согласованной дате.', Icon: IconBox },
];

const TERMS = [
  { title: 'Состав под вас', text: 'Конфеты, упаковку и наполнение подбираем под бюджет, вкус получателей и повод.', Icon: IconCandy },
  { title: 'Объём — какой нужен', text: 'Размер партии обсуждаем индивидуально. Расскажите, сколько наборов вам нужно.', Icon: IconStack },
  { title: 'Сборка и отгрузка', text: 'Закупаем, соединяем и собираем наборы сами, а затем отгружаем к нужной дате.', Icon: IconTruck },
  { title: 'Для компаний', text: 'Работаем с организациями. Детали оплаты и документов обсудим при оформлении заказа.', Icon: IconDoc },
];

const WAY = [
  { label: 'Закупаем', Icon: IconCart },
  { label: 'Собираем', Icon: IconBox },
  { label: 'Упаковываем', Icon: IconBow },
  { label: 'Отгружаем', Icon: IconTruck },
];

const FAQ = [
  { q: 'Что вы продаёте?', a: 'Подарочные наборы оптом. Конфеты, упаковку и наполнение мы закупаем и собираем в набор под задачу заказчика.' },
  { q: 'Можно ли собрать набор под наш бюджет?', a: 'Да. Назовите бюджет и количество наборов, и мы предложим подходящий состав.' },
  { q: 'Как быстро можно получить заказ?', a: 'Срок зависит от состава и объёма, назовём его после заявки. Перед Новым годом спрос высокий, поэтому лучше оформить заказ заранее.' },
  { q: 'Как рассчитывается стоимость?', a: 'Цена зависит от состава, упаковки и количества наборов. Рассчитаем её после того, как вы оставите заявку.' },
  { q: 'Как оставить заявку?', a: 'Заполните форму внизу страницы. Мы свяжемся с вами и уточним детали.' },
];

const at = (left: number, bottom: number, width: number, rotate = 0, flip = false): React.CSSProperties => ({
  left: `${left}%`, bottom: `${bottom}%`, width: `${width}%`,
  transform: `rotate(${rotate}deg)${flip ? ' scaleX(-1)' : ''}`,
});

export default function Home() {
  return (
    <>
    <main>
      <ArtDefs />
      <header className="footer hero" aria-label="ДариСмысл">
        <FooterBackground />
        <div className="hero-dusk" aria-hidden="true" />
        <Snow />
        <Garland />
        <Sparkles points={[[5, 34, 18], [15, 58, 12], [31, 30, 14], [45, 21, 11], [63, 27, 15], [71, 15, 10], [88, 48, 18], [94, 30, 12], [79, 63, 12], [24, 70, 16]]} />
        <div className="art art-left" aria-hidden="true">
          <Lollipop style={at(8, 40, 15, -14)} />
          <Lollipop style={at(23, 46, 13, 9)} />
          <GiftBox tone="green" style={at(2, 0, 33)} />
          <GiftBox tone="red" style={at(29, 0, 44)} />
          <GiftBox tone="cream" style={at(40, 40, 22, 7)} />
          <WrappedCandy tone="red" style={at(72, 1, 16, 10)} />
          <WrappedCandy tone="gold" style={at(78, 13, 14, -18)} />
        </div>
        <div className="art art-right" aria-hidden="true">
          <FirBranch className="a" style={at(30, 30, 76, 8, true)} />
          <CandyCane style={at(31, 0, 11, 6)} />
          <CandyCane style={at(40, 0, 11, -8, true)} />
          <GiftBox tone="cream" style={at(54, 0, 28)} />
          <GiftBox tone="red" style={at(74, 0, 24)} />
          <WrappedCandy tone="green" style={at(8, 3, 16, -8)} />
        </div>
        <div className="jobs">
          <span className="tag">Новогодние подарки оптом</span>
          <h1 className="headline job-title">Дарим смысл<br />Собираем праздник</h1>
          <nav className="footer-nav" aria-label="Разделы">
            <a href="#how">Как заказать</a>
            <a href="#terms">Условия опта</a>
            <a href="#about">О нас и FAQ</a>
            <a href="#contact">Заявка</a>
          </nav>
        </div>
        <div className="logo" role="img" aria-label="ДариСмысл">
          <Wordmark />
        </div>
        <div className="contact">
          <span className="tag">Оставьте заявку</span>
          <div className="headline contact-links">
            <span>Расскажите задачу</span>
            <span>Соберём под вас*</span>
          </div>
          <p className="note">*конфеты, упаковка и состав — под ваш заказ.</p>
          <a className="cta" href="#contact">Оставить заявку</a>
        </div>
      </header>

      <section className="section light" id="how">
        <Drift fill="#fff8ee" />
        <div className="section-bg" aria-hidden="true">
          <Snowflake className="bg-flake" style={{ left: '-3%', top: '10%', width: 220, transform: 'rotate(12deg)' }} />
          <Snowflake className="bg-flake" style={{ right: '4%', bottom: '8%', width: 150, transform: 'rotate(-8deg)' }} />
          <FirBranch className="bg-fir" style={{ right: '-3%', top: '-1%', width: 'min(34vw,430px)', transform: 'rotate(172deg) scaleY(-1)' }} />
          <GiftBox tone="green" className="bg-gift" style={{ left: '1%', bottom: '2%', width: 'clamp(70px,8vw,120px)' }} />
          <GiftBox tone="red" className="bg-gift" style={{ left: '7%', bottom: '2%', width: 'clamp(54px,6vw,90px)' }} />
          <WrappedCandy tone="red" className="bg-gift" style={{ right: '22%', bottom: '4%', width: 'clamp(50px,5vw,76px)', transform: 'rotate(-10deg)' }} />
          <Star className="bg-star" style={{ left: '46%', top: '9%', width: 26 }} />
          <Star className="bg-star" style={{ right: '14%', top: '46%', width: 18 }} />
        </div>
        <div className="wrap">
          <h2 className="title">Как заказать</h2>
          <p className="lead">Четыре шага от заявки до отгрузки.</p>
          <ol className="steps">
            {STEPS.map(({ title, text, Icon }, i) => (
              <li key={title}>
                <span className="ball" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <Icon className="step-icon" />
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section fir" id="terms">
        <Drift fill="#0f3b2d" />
        <div className="section-bg" aria-hidden="true">
          <i className="bk" style={{ left: '8%', top: '30%', width: 320, height: 320 }} />
          <i className="bk gold" style={{ right: '6%', top: '8%', width: 420, height: 420 }} />
          <i className="bk red" style={{ right: '30%', bottom: '-12%', width: 380, height: 380 }} />
          <Snow className="snow-sec" />
          <Snowflake className="bg-flake gold" style={{ right: '3%', bottom: '5%', width: 190, transform: 'rotate(10deg)' }} />
          <Snowflake className="bg-flake gold" style={{ left: '-2%', top: '36%', width: 140, transform: 'rotate(-14deg)' }} />
          <FirBranch className="bg-fir" style={{ left: '-4%', bottom: '-2%', width: 'min(32vw,420px)', transform: 'rotate(-6deg)' }} />
          <Sparkles points={[[12, 20, 14], [34, 10, 10], [58, 16, 12], [84, 34, 16], [92, 74, 12], [52, 90, 12], [20, 62, 10]]} />
        </div>
        <Garland className="garland-sec" />
        <div className="wrap">
          <h2 className="title">Условия опта</h2>
          <ul className="terms">
            {TERMS.map(({ title, text, Icon }) => (
              <li key={title}>
                <span className="icon-disc"><Icon className="term-icon" /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="terms-note"><Star className="note-star" />Цены и сроки зависят от состава и объёма. Рассчитаем их после заявки.<Star className="note-star" /></p>
        </div>
      </section>

      <section className="section light" id="about">
        <Drift fill="#fff8ee" />
        <div className="section-bg" aria-hidden="true">
          <Snowflake className="bg-flake" style={{ right: '-2%', top: '6%', width: 200, transform: 'rotate(20deg)' }} />
          <Snowflake className="bg-flake" style={{ left: '38%', bottom: '4%', width: 120, transform: 'rotate(-6deg)' }} />
          <CandyCane className="bg-gift" style={{ left: '1.5%', top: '8%', width: 'clamp(30px,3.4vw,52px)', transform: 'rotate(-12deg)' }} />
          <CandyCane className="bg-gift" style={{ left: '4.5%', top: '12%', width: 'clamp(30px,3.4vw,52px)', transform: 'rotate(8deg) scaleX(-1)' }} />
          <FirBranch className="bg-fir" style={{ right: '-4%', bottom: '-1%', width: 'min(30vw,400px)', transform: 'rotate(184deg)' }} />
          <Star className="bg-star" style={{ left: '48%', top: '58%', width: 22 }} />
        </div>
        <div className="wrap about">
          <div className="about-text">
            <h2 className="title">О нас</h2>
            <p>
              ДариСмысл — белорусская компания, которая собирает подарочные наборы на заказ.
              Мы сами закупаем конфеты, упаковку и наполнение, соединяем их в наборы и отгружаем оптом так, как нужно именно вам.
            </p>
            <p>Дарить подарки — это про внимание и смысл. Поэтому каждый набор мы собираем под повод, получателей и бюджет заказчика.</p>
            <ul className="way">
              {WAY.map(({ label, Icon }) => (
                <li key={label}>
                  <span className="icon-disc"><Icon className="way-icon" /></span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="faq" id="faq">
            <h2 className="title">Вопросы и ответы</h2>
            {FAQ.map(item => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section red" id="contact">
        <Drift fill="#a3141c" />
        <div className="section-bg" aria-hidden="true">
          <i className="bk gold" style={{ left: '-6%', top: '10%', width: 440, height: 440 }} />
          <i className="bk" style={{ right: '-4%', bottom: '4%', width: 400, height: 400 }} />
          <Snow className="snow-sec" />
          <Snowflake className="bg-flake white" style={{ right: '5%', top: '6%', width: 170, transform: 'rotate(8deg)' }} />
          <Snowflake className="bg-flake white" style={{ left: '2%', bottom: '14%', width: 120, transform: 'rotate(-16deg)' }} />
          <Sparkles points={[[6, 14, 14], [30, 8, 10], [46, 30, 12], [92, 18, 14], [64, 6, 10], [97, 60, 12], [38, 84, 12]]} />
        </div>
        <div className="wrap contact-wrap">
          <div className="contact-intro">
            <h2 className="title">Оставьте заявку</h2>
            <p>Расскажите, какие подарки вам нужны. Мы вернёмся с предложением по составу, стоимости и срокам.</p>
            <div className="contact-art" aria-hidden="true">
              <FirBranch style={at(-6, 38, 78, -6)} />
              <CandyCane style={at(6, 0, 11, -8)} />
              <CandyCane style={at(14, 0, 11, 8, true)} />
              <GiftBox tone="cream" style={at(24, 0, 34)} />
              <GiftBox tone="green" style={at(54, 0, 28)} />
              <GiftBox tone="cream" style={at(60, 36, 18, -8)} />
              <WrappedCandy tone="gold" style={at(83, 2, 16, 12)} />
            </div>
          </div>
          <LeadForm />
        </div>
      </section>
    </main>
    <SiteFooter home />
    </>
  );
}
