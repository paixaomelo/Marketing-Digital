import { useEffect, useRef, useState } from 'react'

const WA = 'https://chat.whatsapp.com/KCBhT4dBFWq8OFtL12O8PW'
const START = new Date('2026-12-07T08:00:00+01:00')

const MODS = [
  { n: '01', t: 'Design Gráfico', who: 'Paulo Sebastião', img: '/paulo.webp', aulas: 5, h: 15,
    d: 'Do conceito ao cartaz final. Aprendes a pensar e a construir peças que prendem o olhar e vendem.',
    items: ['Fundamentos do design gráfico', 'Composição visual e identidade gráfica', 'Criação de cartazes e materiais publicitários', 'Utilização do Adobe Photoshop', 'Materiais para redes sociais e publicidade'] },
  { n: '02', t: 'Gestão de Tráfego Pago', who: 'Paixão Melo', img: '/paixao.webp', aulas: 3, h: 9,
    d: 'Pões o teu anúncio à frente das pessoas certas, com orçamento controlado e resultados que se medem.',
    items: ['Fundamentos do tráfego pago e introdução ao Meta Ads', 'Criação e configuração de campanhas publicitárias', 'Segmentação de públicos', 'Definição de objectivos e orçamento', 'Monitorização, análise e optimização de resultados'] },
]
const METODO = [
  ['Formação presencial', 'Aulas ao vivo, com os formadores ao teu lado.'],
  ['Aprendizagem prática', 'Menos teoria, mais mãos na massa.'],
  ['Exercícios orientados', 'Cada aula termina com algo que tu criaste.'],
  ['Ferramentas profissionais', 'Photoshop e Meta Ads, as mesmas do mercado.'],
  ['Situações reais', 'Aplicas tudo a casos como os que vais encontrar.'],
]
const FAQ = [
  ['Preciso de conhecimentos prévios para participar?', 'Não. A formação parte dos fundamentos. Precisas de vontade de aprender e de um computador próprio.'],
  ['A formação é presencial?', 'Sim. Todas as aulas são presenciais, com acompanhamento directo dos formadores.'],
  ['Quanto tempo dura a formação?', 'Um mês: 8 aulas de 3 horas, aos fins de semana, num total de 24 horas. Começa a 7 de Dezembro de 2026.'],
  ['O certificado está incluído?', 'Sim. O Certificado de Participação está incluído nas duas modalidades de pagamento.'],
  ['Quais ferramentas serão utilizadas?', 'Adobe Photoshop no módulo de Design Gráfico e Meta Ads no módulo de Gestão de Tráfego Pago.'],
  ['Posso pagar em prestações?', 'Sim. Podes pagar 65.000 Kz em duas prestações. O pagamento integral (57.000 Kz) é a opção mais vantajosa.'],
  ['Quando devo pagar a segunda prestação?', 'Na segunda semana da formação. A 1.ª prestação (52.000 Kz) paga-se no acto da inscrição.'],
  ['Como posso efectuar a inscrição?', 'Entra no grupo oficial do WhatsApp através de qualquer botão de inscrição e segue as instruções.'],
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-r]')
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}
function useCountdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const d = Math.max(0, START - now)
  return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60]
}
function Count({ to }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const f = t => { const p = Math.min((t - t0) / 1400, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(f) }
      requestAnimationFrame(f)
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{v}</span>
}
const Word = ({ t, d = 0 }) => (
  <span className="w" aria-hidden="true">{[...t].map((c, i) => <span key={i} style={{ '--i': i + d }}>{c}</span>)}</span>
)
const Cta = ({ children, cls = '' }) => (
  <a className={'btn ' + cls} href={WA} target="_blank" rel="noopener noreferrer">{children}<b aria-hidden="true">→</b></a>
)

export default function App() {
  useReveal()
  const [y, setY] = useState(0)
  const [prog, setProg] = useState(0)
  const [open, setOpen] = useState(0)
  const cd = useCountdown()
  useEffect(() => {
    const f = () => { const h = document.documentElement; setY(h.scrollTop); setProg(h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1)) }
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])

  return (
    <>
      <div className={'hd' + (y > 40 ? ' s' : '')}>
        <div className="hi">
          <a href="#topo" className="logo">Marketing<span>Digital</span></a>
          <nav><a href="#sobre">Sobre</a><a href="#modulos">Módulos</a><a href="#cronograma">Cronograma</a><a href="#investimento">Investimento</a><a href="#faq">FAQ</a></nav>
          <Cta cls="sm">Inscrever</Cta>
        </div>
        <i className="prog" style={{ transform: `scaleX(${prog})` }} />
      </div>

      <header className="hero" id="topo">
        <div className="curtain" /><div className="sweep" />
        <div className="top fx" style={{ '--d': '.1s' }}><b>07 DEZEMBRO</b><i /><span>Zango II, Vila Nova, Rua E/7<br />Centro 1000 Confortos</span></div>
        <div className="hw">
          <span className="tagx fx" style={{ '--d': '.15s' }}>Formação de</span>
          <h1 aria-label="Marketing Digital"><Word t="MARKETING" /><Word t="DIGITAL" d={9} /></h1>
          <p className="sub fx" style={{ '--d': '1.1s' }}>Aprende a criar o design que chama a atenção e os anúncios que trazem clientes. Duas competências em 8 aulas presenciais.</p>
          <div className="chips fx" style={{ '--d': '1.25s' }}><span>Presencial</span><span>1 mês · fins de semana</span><span>Certificado incluído</span></div>
          <div className="row fx" style={{ '--d': '1.4s' }}>
            <Cta>Garantir a minha vaga</Cta>
            <div className="from">Investimento a partir de<strong>57.000 Kz</strong></div>
          </div>
          <div className="cd fx" style={{ '--d': '1.6s' }} aria-label="Contagem decrescente para 7 de Dezembro">
            {['dias', 'horas', 'min', 'seg'].map((l, i) => <div key={l}><b>{String(cd[i]).padStart(2, '0')}</b><small>{l}</small></div>)}
          </div>
        </div>
        <svg className="spin" viewBox="0 0 120 120" aria-hidden="true">
          <defs><path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
          <text><textPath href="#circ">VAGAS LIMITADAS • VAGAS LIMITADAS • </textPath></text>
        </svg>
      </header>

      <div className="mq" aria-hidden="true"><div>
        {[0, 1].map(k => <span key={k}>Design Gráfico ✦ Tráfego Pago ✦ 8 aulas ✦ 24 horas ✦ Certificado ✦ 7 Dezembro ✦ Presencial ✦&nbsp;</span>)}
      </div></div>

      <section className="sec" id="sobre"><div className="wrap">
        <div className="two">
          <div data-r>
            <span className="kick">Sobre a formação</span>
            <h2 className="h2">Design que <em>chama a atenção.</em><br />Anúncios que <em>trazem clientes.</em></h2>
          </div>
          <div data-r style={{ '--d': '.15s' }}>
            <p className="lead">Hoje, qualquer negócio precisa de duas coisas: uma imagem forte e gente certa a vê-la. Esta formação junta Design Gráfico e Tráfego Pago num só percurso, com exercícios práticos e ferramentas que o mercado usa todos os dias.</p>
            <div className="stats">
              {[[8, 'Aulas'], [24, 'Horas'], [2, 'Módulos'], [1, 'Mês']].map(([n, l]) => <div key={l}><b><Count to={n} /></b><small>{l}</small></div>)}
            </div>
          </div>
        </div>
        <div className="three">
          {[
            ['Para quem é', ['Quem quer entrar no marketing digital', 'Empreendedores e donos de negócio', 'Criadores de conteúdo e freelancers']],
            ['O que vais aprender', ['Criar cartazes e peças para redes sociais', 'Montar campanhas no Meta Ads', 'Medir e melhorar resultados']],
            ['Competências', ['Identidade e composição visual', 'Segmentação de públicos e orçamento', 'Optimização de campanhas']],
          ].map(([t, l], i) => (
            <div key={t} data-r style={{ '--d': i * 0.12 + 's' }}>
              <h3><em>0{i + 1}</em>{t}</h3>
              <ul>{l.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sec dark" id="modulos"><div className="wrap">
        <span className="kick" data-r>O que vais aprender</span>
        <h2 className="h2" data-r>Dois módulos.<br /><em>Dois especialistas.</em></h2>
        <div style={{ height: 70 }} />
        {MODS.map((m, i) => (
          <article key={m.n} className={'mod' + (i % 2 ? ' rev' : '')}>
            <div className="num" aria-hidden="true">{m.n}</div>
            <div className="pic" data-r>
              <div className="glow" />
              <img src={m.img} alt={'Formador ' + m.who} width="900" height="1273" loading={i ? 'lazy' : 'eager'} />
              <span className="name">com <b>{m.who}</b></span>
            </div>
            <div className="info">
              <span className="tagx" data-r>Módulo {m.n}</span>
              <h3 data-r>{m.t}</h3>
              <p data-r>{m.d}</p>
              <ul>{m.items.map((x, j) => <li key={x} data-r style={{ '--d': j * 0.08 + 's' }}><em>{j + 1}</em>{x}</li>)}</ul>
              <div className="pills" data-r><span>{m.aulas} aulas</span><span>{m.h} horas</span></div>
            </div>
          </article>
        ))}
      </div></section>

      <section className="sec" id="cronograma"><div className="wrap">
        <span className="kick" data-r>Cronograma</span>
        <h2 className="h2" data-r>8 aulas. <em>24 horas.</em></h2>
        <p className="lead" data-r>Cada aula dura 3 horas, aos sábados e domingos, ao longo de um mês.</p>
        <div className="les" data-r>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className={'lesson ' + (i < 5 ? 'dg' : 'tp')} style={{ '--i': i }}>
              <small>Aula</small><b>0{i + 1}</b><span>3h · {i < 5 ? 'Design' : 'Tráfego'}</span>
            </div>
          ))}
        </div>
        <div className="tot" data-r>
          <div><i className="d1" />Design Gráfico<b>5 aulas · 15 horas</b></div>
          <div><i className="d2" />Gestão de Tráfego Pago<b>3 aulas · 9 horas</b></div>
          <div className="all">Total<b>8 aulas · 24 horas</b></div>
        </div>
      </div></section>

      <section className="sec dark"><div className="wrap">
        <span className="kick" data-r>Metodologia</span>
        <h2 className="h2" data-r>Aprender <em>fazendo.</em></h2>
        <ul className="mt">{METODO.map(([t, d], i) => <li key={t} data-r style={{ '--d': i * 0.07 + 's' }}>{t}<span>{d}</span></li>)}</ul>
      </div></section>

      <section className="sec" id="investimento"><div className="wrap">
        <span className="kick" data-r>Investimento</span>
        <h2 className="h2" data-r>Escolhe como <em>queres pagar.</em></h2>
        <p className="lead" data-r>As duas modalidades dão acesso à formação completa e incluem o Certificado de Participação.</p>
        <div className="plans">
          <div className="plan best" data-r>
            <span className="badge">Opção mais económica</span>
            <h3>Pagamento integral</h3>
            <div className="amt">57.000<small>Kz</small></div>
            <ul><li>Pagamento único</li><li>Desconto de 8.000 Kz</li><li>Valor total da formação: 57.000 Kz</li><li>Certificado de Participação incluído</li></ul>
            <Cta>Inscrever com 57.000 Kz</Cta>
          </div>
          <div className="plan" data-r style={{ '--d': '.12s' }}>
            <h3>Duas prestações</h3>
            <div className="amt">65.000<small>Kz</small></div>
            <table><thead><tr><th>Prestação</th><th>Valor</th><th>Prazo</th></tr></thead>
              <tbody><tr><td>1.ª</td><td>52.000 Kz</td><td>No acto da inscrição</td></tr><tr><td>2.ª</td><td>13.000 Kz</td><td>Na segunda semana</td></tr></tbody></table>
            <ul><li>Total: 65.000 Kz</li><li>Certificado de Participação incluído</li></ul>
            <Cta cls="ghost">Inscrever em prestações</Cta>
          </div>
        </div>
      </div></section>

      <section className="sec dark" id="faq"><div className="wrap narrow">
        <span className="kick" data-r>Perguntas frequentes</span>
        <h2 className="h2" data-r>Ficou alguma <em>dúvida?</em></h2>
        <div style={{ height: 40 }} />
        <div data-r>
          {FAQ.map(([q, a], i) => (
            <div key={q} className={'faq' + (open === i ? ' open' : '')}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><i /></button>
              <div className="ans"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="final"><div className="curtain" /><div className="wrap" data-r>
        <span className="tagx">Vagas limitadas</span>
        <h2 className="h2">Começa a <em>7 de Dezembro.</em></h2>
        <p className="lead">Pagamento integral por 57.000 Kz ou em duas prestações (65.000 Kz). Entra no grupo oficial e garante o teu lugar.</p>
        <Cta>Entrar no grupo do WhatsApp</Cta>
      </div></section>

      <footer>
        <b>Formação de Marketing Digital</b>
        <span>Zango II, Vila Nova, Rua E/7 · Centro 1000 Confortos</span>
        <span><a href="tel:+244941451206">941 451 206</a> · <a href="tel:+244952007774">952 007 774</a></span>
      </footer>
      <a className="fab" href={WA} target="_blank" rel="noopener noreferrer">Inscrever-me agora →</a>
    </>
  )
}
