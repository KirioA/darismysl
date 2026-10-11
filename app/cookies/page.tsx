import type { Metadata } from 'next';
import Link from 'next/link';
import { Clause, LegalPage } from '../legal';
import { COMPANY } from '../company';

export const metadata: Metadata = {
  title: 'Политика в отношении файлов cookie',
  description: 'Какие файлы cookie использует сайт ДариСмысл, зачем и как отказаться от них.',
  alternates: { canonical: '/cookies' },
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Политика в отношении файлов cookie" edition={`Редакция от ${COMPANY.cookiePolicyVersion.split('-').reverse().join('.')}`}>
      <section>
        <h2>1. Что такое cookie</h2>
        <Clause n="1.1.">
          Cookie — небольшие файлы, которые сайт сохраняет в браузере посетителя. Они позволяют узнать браузер при повторном посещении
          и собрать обезличенную статистику о том, как используется сайт.
        </Clause>
        <Clause n="1.2.">
          Оператор — {COMPANY.name}, УНП {COMPANY.unp}, {COMPANY.address}. Настоящая политика дополняет{' '}
          <Link href="/privacy">Политику в отношении обработки персональных данных</Link>.
        </Clause>
      </section>

      <section>
        <h2>2. Какие cookie используются</h2>
        <Clause n="2.1.">
          Технически необходимых cookie сайт не устанавливает: сайт и форма заявки работают без них. Выбор посетителя в баннере
          хранится в его браузере (localStorage) и Оператору не передаётся.
        </Clause>
        <Clause n="2.2.">
          Следующие cookie устанавливаются <strong>только после того, как посетитель нажал «Принять»</strong> в баннере:
        </Clause>
        <ul className="legal-list">
          {COMPANY.metrikaId && (
            <li><strong>Яндекс Метрика</strong> — аналитические cookie (например, _ym_uid, _ym_d, _ym_isad), срок хранения до 1 года.
              Цель — статистика посещений: какие страницы просматривают, откуда приходят, сколько заявок отправлено. Запись действий (Вебвизор) не используется.</li>
          )}
          {COMPANY.googleAdsId && (
            <li><strong>Google Реклама (тег Google)</strong> — рекламные cookie (например, _gcl_au, _gcl_aw), срок хранения до 90 дней.
              Цель — понять, с каких объявлений в Google приходят посетители и заявки, и показывать рекламу эффективнее.</li>
          )}
        </ul>
        <Clause n="2.3.">
          Основание — согласие посетителя (ст. 5 Закона Республики Беларусь «О защите персональных данных»).
        </Clause>
      </section>

      <section>
        <h2>3. Кто получает данные</h2>
        <Clause n="3.1.">
          Передаются: идентификаторы cookie, IP-адрес, сведения о браузере и устройстве, адреса просмотренных страниц, источник перехода
          (в том числе рекламное объявление), действия на сайте (клики, факт отправки формы — без её содержимого). Получатели:
        </Clause>
        <ul className="legal-list">
          {COMPANY.metrikaId && <li>ООО «ЯНДЕКС» (119021, Российская Федерация, г. Москва, ул. Льва Толстого, д. 16) — сервис Яндекс Метрика;</li>}
          {COMPANY.googleAdsId && <li>Google LLC (1600 Amphitheatre Parkway, Mountain View, California 94043, USA) — сервис Google Реклама; данные могут обрабатываться в США и иных странах.</li>}
        </ul>
        <Clause n="3.2.">
          Передача за пределы Республики Беларусь осуществляется на основании согласия, которое посетитель даёт кнопкой «Принять», после
          информирования о рисках: в стране получателя может не обеспечиваться надлежащий уровень защиты прав субъектов персональных данных.
          Без согласия эти сервисы на сайте не загружаются и данные не передаются.
        </Clause>
      </section>

      <section>
        <h2>4. Как отказаться или отозвать согласие</h2>
        <Clause n="4.1.">
          Нажмите «Отклонить» в баннере или в любой момент — «Настройки cookie» в подвале сайта. При отзыве согласия счётчик
          перестаёт загружаться, страница перезагружается.
        </Clause>
        <Clause n="4.2.">
          Можно также удалить cookie в настройках браузера
          {COMPANY.metrikaId && <>, установить <a href="https://yandex.ru/support/metrica/general/opt-out.html" target="_blank" rel="noopener noreferrer">блокировщик Яндекс Метрики</a></>}
          {COMPANY.googleAdsId && <> или отключить персонализацию в <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">настройках рекламы Google</a></>}.
        </Clause>
        <Clause n="4.3.">
          Вопросы по обработке данных — по телефону {COMPANY.phoneView}.
        </Clause>
      </section>
    </LegalPage>
  );
}
