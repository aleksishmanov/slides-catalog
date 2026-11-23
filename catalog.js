// Каталог колод. related — связанные колоды (id), обратная ссылка обязательна:
// показывает components/related.js, проверяет tools/check_decks.py.
const presentations = [
  {
    id: "initiatives-year-report",
    title: "Все инициативы за год для генерального директора из итогов спринтов",
    description: "Как собрать для генерального директора все инициативы за год, когда отчёт нужен срочно. Отчёт складывается из бизнес-отчётов спринта и утренней рефлексии агентов: что записывать по ходу года и где нужен человек. Случай автора и демо на вымышленной команде.",
    cover: "initiatives-year-report/cover.png",
    slides: 12,
    updated: "23 ноября 2026",
    related: ["sprint-business-report", "agent-reflection-comments", "sprint-under-manager"]
  },
  {
    id: "call-reminders-sync",
    title: "Напоминания после созвона: сверка с ИИ-агентом в календаре",
    description: "После рефлексии созвона ИИ-агент заносит в рабочий календарь только то, что вы обещали сделать сами: одно дело — одно напоминание, без дублей. Закрыли напоминание или ответили в заметке — агент это видит. Штатные «Напоминания» на iPhone, задачи Exchange, без своего приложения и платных зависимостей.",
    cover: "call-reminders-sync/cover.png",
    slides: 14,
    updated: "23 ноября 2026",
    related: ["call-reflection-goals", "call-transcript-guarantee", "agent-reflection-comments", "po-morning-brief", "po-news-feed", "hermes-bridge-hq", "cortex-second-brain", "cortex-po-agents", "sprint-under-manager"]
  },
  {
    id: "call-transcript-guarantee",
    title: "Расшифровка созвона есть всегда: агент присутствия вместо вас",
    description: "Агент заходит на встречи рабочего календаря вместо руководителя — без камеры и лица, — добивается включённой расшифровки, а послепроверка каждый час сверяет сервис созвонов, ленту и календарь и называет каждую потерю записи в тот же день.",
    cover: "call-transcript-guarantee/cover.png",
    slides: 14,
    updated: "19 ноября 2026",
    related: ["call-reminders-sync", "call-reflection-goals", "agent-reflection-comments", "po-news-feed", "cortex-po-agents"]
  },
  {
    id: "agent-reflection-comments",
    title: "Рефлексия ИИ-агентов: комментарий выравнивает знания человека и агента",
    description: "Каждое утро PO-агенты сдают рефлексию по ключевым пунктам движения к целям квартала. Руководитель комментирует расхождения — и комментарий сразу становится знанием агента: поправкой факта, уроком или поручением. Живой экран и документ на демо-данных.",
    cover: "agent-reflection-comments/cover.png",
    slides: 14,
    updated: "19 ноября 2026",
    related: ["call-reminders-sync", "call-transcript-guarantee", "call-reflection-goals", "cortex-po-agents", "po-morning-brief", "initiatives-year-report"]
  },
  {
    id: "call-reflection-goals",
    title: "Рефлексия созвона: агент отвечает, как встреча меняет мои цели",
    description: "ИИ-агент не пересказывает расшифровку созвона, а через несколько минут присылает PDF: итоги и договорённости, а главное — как услышанное двигает цели: AS IS, GAP, TO BE, что сделано с прошлой встречи и что осталось решить. Настоящий документ на демо-данных.",
    cover: "call-reflection-goals/cover.png",
    slides: 15,
    updated: "19 ноября 2026",
    related: ["call-reminders-sync", "call-transcript-guarantee", "agent-reflection-comments", "okr-quarter-planning", "cortex-second-brain"]
  },
  {
    id: "release-journal",
    title: "Релизы: факт отгрузки, а не статус в Jira",
    description: "Каждая выкладка в прод становится короткой заметкой: как было, как стало, где проверить и на каких данных это основано. Гарантия, что доработка отгружена, задачу можно закрывать, а работа команды подтверждена.",
    cover: "release-journal/cover.png",
    slides: 12,
    updated: "19 ноября 2026",
    related: ["sprint-business-report"]
  },
  {
    id: "authentik-security",
    title: "Один вход для людей, агентов и ИИ: безопасность контура через Authentik",
    description: "Как в контур PO встроен Authentik: каждый запрос сначала спрашивает вход, доступ — группой на приложение, второй фактор, сервисные аккаунты агентов и инструменты ИИ-коннектора по учётке. Какие угрозы это закрывает, что осталось на человеке и на каких граблях учились.",
    cover: "authentik-security/cover.png",
    slides: 14,
    updated: "19 ноября 2026",
    related: ["hermes-bridge-hq"]
  },
  {
    id: "cortex-po-agents",
    title: "Общая память ИИ-агентов: факт становится фактом, когда его принял руководитель",
    description: "Три PO-агента читают одну память организации, а не свои заметки. Агенты сдают факты со ссылкой на источник, руководитель принимает их один раз — и их видят все. Что изменилось в ответах агентов и как это измеряется.",
    cover: "cortex-po-agents/cover.png",
    slides: 13,
    updated: "19 ноября 2026",
    related: ["call-reminders-sync", "call-transcript-guarantee", "agent-reflection-comments", "cortex-second-brain", "hermes-bridge-hq"]
  },
  {
    id: "hermes-bridge-hq",
    title: "Штаб корпоративных агентов в кармане: Claude Code с телефона",
    description: "Поручаю задачу в Claude Code с телефона, а Hermes-агенты внутри корпоративного контура делают её в Jira, Confluence и мессенджерах. Данные и ключи остаются в контуре, два режима — A2A и MCP.",
    cover: "hermes-bridge-hq/cover.png",
    slides: 13,
    updated: "21 октября 2026",
    related: ["call-reminders-sync", "cortex-po-agents", "authentik-security", "claude-desktop-zai-macos"]
  },
  {
    id: "po-news-gazette",
    title: "Новостная газета продакта: утренний выпуск по вашим целям",
    description: "Утром приходит газета: полная сводка изменений вокруг продакта с учётом целей квартала и специфики команды. Что уже работает в ленте — выпуск, ИИ-редакция, оценки — и следующий шаг: персональный профиль продакта.",
    cover: "po-news-gazette/cover.png",
    slides: 13,
    updated: "21 октября 2026",
    related: ["po-morning-brief", "po-news-feed"]
  },
  {
    id: "service-blueprint-backlog",
    title: "Service Blueprint из БФТ: бэклог, который рисует карту",
    description: "ИИ-агент раскладывает БФТ в автономный проект Backlog.md — задачи команд, технические карточки с UserStory, JobStory и процессом в BPMN, требования к экранам, — а скрипт собирает из него карту: что видят люди, что делает каждая команда и как это работает.",
    cover: "service-blueprint-backlog/cover.png",
    slides: 17,
    updated: "19 октября 2026",
    related: ["po-workspace-bft-plugin"]
  },
  {
    id: "po-morning-brief",
    title: "Утренний бриф PO: лента, команды, спринт и обещания",
    description: "Четыре части утра PO: лента всех чатов и утренний выпуск, PDF-отчёт по командам и мини-приложение «Дейли», отчёт по спринту для техлида и бизнеса, персональный ИИ-агент — Инбокс как точка контроля обещаний.",
    cover: "po-morning-brief/cover.png",
    slides: 41,
    updated: "19 октября 2026",
    related: ["call-reminders-sync", "agent-reflection-comments", "po-news-feed", "po-news-gazette", "sprint-daily-report", "sprint-business-report"]
  },
  {
    id: "sprint-daily-report",
    title: "Отчёт спринта: что техлиду сделать сегодня",
    description: "Две страницы PDF на команду каждое утро: успеваем ли к концу спринта, что держит команду и какие задачи сдвинуть сегодня — с номерами из Jira. Сам собирает данные, без ручной работы.",
    cover: "sprint-daily-report/cover.png",
    slides: 13,
    updated: "19 октября 2026",
    related: ["po-morning-brief", "sprint-under-manager", "sprint-business-report", "sprint-blockers-report"]
  },
  {
    id: "claude-desktop-zai-macos",
    title: "Claude Desktop с Китайскими моделями",
    description: "Практикум: Claude Code, GLM и пошаговый запуск в российских реалиях.",
    cover: "claude-desktop-zai-macos/cover.png",
    slides: 9,
    updated: "17 сентября 2026",
    related: ["hermes-bridge-hq"]
  },
  {
    id: "po-workspace-bft-plugin",
    title: "БФТ под управлением руководителя",
    description: "Как AI-агент собирает бизнес-контекст и превращает его в требования для согласования.",
    cover: "po-workspace-bft-plugin/cover.png",
    slides: 13,
    updated: "11 сентября 2026",
    related: ["service-blueprint-backlog"]
  },
  {
    id: "sprint-under-manager",
    title: "Спринты под управлением руководителя",
    description: "Как руководителю держать спринты четырёх команд без обхода: отчёт PO приходит сам каждое утро, «Факт спринта» — для комитета, а замечания техлидов ИИ-агент сам переносит в Jira после ✅.",
    cover: "sprint-under-manager/cover.png",
    slides: 20,
    updated: "19 октября 2026",
    related: ["call-reminders-sync", "sprint-daily-report", "sprint-business-report", "sprint-blockers-report", "initiatives-year-report"]
  },
  {
    id: "okr-quarter-planning",
    title: "Планирование квартала за час разговора с ИИ",
    description: "Квартал — огромный и ресурсоёмкий сбор и аналитика данных. Как пройти весь путь — итоги прошлого квартала, планы на следующий, декомпозиция с техлидами — за час голосового разговора с ИИ-помощником.",
    cover: "okr-quarter-planning/cover.png",
    slides: 14,
    updated: "7 октября 2026",
    related: ["call-reflection-goals", "cortex-second-brain", "sprint-business-report"]
  },
  {
    id: "po-news-feed",
    title: "Лента вместо 100500 чатов",
    description: "Как PO наблюдать за всем вокруг и не терять внимание: чаты, почта и трекеры в одной ленте, упоминания сразу и ИИ-агент, который сверяет происходящее с целями.",
    cover: "po-news-feed/cover.png",
    slides: 11,
    updated: "13 октября 2026",
    related: ["call-reminders-sync", "call-transcript-guarantee", "po-morning-brief", "po-news-gazette"]
  },
  {
    id: "sprint-business-report",
    title: "Бизнес-отчёт спринта: ценность от целей квартала",
    description: "Какую бизнес-ценность команда создала за спринт в контексте целей квартала — и как чистота отчёта наводит порядок в JIRA разговором с ИИ-агентом.",
    cover: "sprint-business-report/cover.png",
    slides: 16,
    updated: "19 октября 2026",
    related: ["po-morning-brief", "sprint-daily-report", "sprint-under-manager", "okr-quarter-planning", "release-journal", "initiatives-year-report"]
  },
  {
    id: "sprint-blockers-report",
    title: "Где и почему команда разработки была заблокирована",
    description: "Отчёт по блокерам за квартал для руководителя: ИИ-агент разбирает историю JIRA, скрипт считает дни ожидания — видно, кого ждали, где стояли задачи и что держит сейчас.",
    cover: "sprint-blockers-report/cover.png",
    slides: 12,
    updated: "15 октября 2026",
    related: ["sprint-daily-report", "sprint-under-manager"]
  },
  {
    id: "cortex-second-brain",
    title: "Второй мозг руководителя",
    description: "ИИ-помощник, который помнит договорённости, отличает факт от мнения и знает цели квартала. Методология poh-cortex и инструкция, как завести такую память себе за вечер.",
    cover: "cortex-second-brain/cover.png",
    slides: 11,
    updated: "18 октября 2026",
    related: ["call-reminders-sync", "call-reflection-goals", "cortex-po-agents", "okr-quarter-planning"]
  }
];

// Сетка каталога — только на главной. На странице колоды файл нужен ради данных для components/related.js.
const grid = document.querySelector("#catalog-grid");
if (grid) {
  const count = document.querySelector("#deck-count");

  const plural = (n) => {
    const d = n % 10, dd = n % 100;
    if (d === 1 && dd !== 11) return "презентация";
    if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return "презентации";
    return "презентаций";
  };
  count.textContent = `${presentations.length} ${plural(presentations.length)}`;

  grid.innerHTML = presentations.map((deck) => `
    <a class="deck-card" href="${deck.id}/" aria-label="Открыть презентацию: ${deck.title}">
        <div class="deck-cover"><img src="${deck.cover}" alt="" width="1280" height="720" loading="lazy" decoding="async"></div>
      <div class="deck-copy">
        <p class="deck-id">/${deck.id}</p>
        <h2 class="deck-title">${deck.title}</h2>
        <p class="deck-description">${deck.description}</p>
        <div class="deck-meta">
          <span>${deck.slides} слайдов · ${deck.updated}</span>
          <span class="deck-open">Открыть ↗</span>
        </div>
      </div>
    </a>
  `).join("");
}
