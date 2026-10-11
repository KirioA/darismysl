const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Band that invites the visitor into the quiz; `type` preselects the recipient.
export default function QuizCta({ type = '' }: { type?: string }) {
  return (
    <section className="quiz-cta" aria-labelledby="quiz-cta-title">
      <div className="wrap quiz-cta-in">
        <div>
          <h2 id="quiz-cta-title">Не знаете, что выбрать?</h2>
          <p>Ответьте на 6 коротких вопросов — пришлём предложение с составом, упаковкой и ценой.</p>
          <button type="button" className="btn btn-berry quiz-cta-btn" data-quiz={type}>Собрать набор за 1 минуту</button>
        </div>
        <div className="quiz-cta-art" aria-hidden="true">
          <img className="qa-box" src={`${base}/kit/box-open.webp`} alt="" />
          <img className="qa-1" src={`${base}/kit/chocolate.webp`} alt="" />
          <img className="qa-2" src={`${base}/kit/tin-can.webp`} alt="" />
          <img className="qa-3" src={`${base}/kit/honey-jar.webp`} alt="" />
        </div>
      </div>
    </section>
  );
}
