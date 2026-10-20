(() => {
  const toggle = document.querySelector('.directory-toggle');
  function closeDirectory() {
    document.body.classList.remove('directory-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }
  toggle?.addEventListener('click', () => {
    const open = document.body.classList.toggle('directory-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('directory-open')) {
      closeDirectory();
      toggle?.focus();
    }
  });
  document.querySelector('.library-main')?.addEventListener('click', closeDirectory);

  const search = document.querySelector('#library-search');
  if (!search) return;
  const names = { site: '站点', dev: '技术', workbench: '折腾', essays: '随笔' };
  const category = document.querySelector('#library-category');
  const sort = document.querySelector('#library-sort');
  const clear = document.querySelector('#library-clear');
  const overview = document.querySelector('#topic-overview');
  const sections = [...document.querySelectorAll('.library-topic-section')];
  const directoryQuery = document.querySelector('#directory-query');
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';
  category.value = names[params.get('topic')] ? params.get('topic') : '';
  sort.value = params.get('sort') === 'title' ? 'title' : 'default';
  const collator = new Intl.Collator('zh-CN');

  function render(updateAddress = false) {
    const query = search.value.trim().toLocaleLowerCase();
    const words = query.split(/\s+/).filter(Boolean);
    const topic = category.value;
    let count = 0;
    sections.sort((a, b) => sort.value === 'title'
      ? collator.compare(a.dataset.title, b.dataset.title)
      : Number(a.dataset.order) - Number(b.dataset.order));
    for (const section of sections) {
      const matches = (!topic || section.dataset.topic === topic)
        && words.every(word => section.dataset.search.toLocaleLowerCase().includes(word));
      section.hidden = !matches;
      if (matches) count++;
      document.querySelector('#library-sections').append(section);
      document.querySelector(`[data-toc-topic="${section.dataset.topic}"]`).hidden = !matches;
    }
    overview.hidden = Boolean(topic || query);
    document.querySelector('#library-title').textContent = query ? '搜索结果' : names[topic] || '文章';
    document.querySelector('#library-crumb').textContent = query ? '搜索' : names[topic] || '总览';
    document.querySelector('#library-count').textContent = count;
    document.querySelector('#library-empty').hidden = count !== 0;
    clear.hidden = !topic && !query && sort.value === 'default';
    directoryQuery.value = search.value;
    document.querySelectorAll('.directory-category').forEach(link => {
      if (topic && new URL(link.href).searchParams.get('topic') === topic) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    if (updateAddress) {
      const url = new URL(location.href);
      for (const [key, value] of [['q', search.value.trim()], ['topic', topic], ['sort', sort.value === 'title' ? 'title' : '']]) {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      history.replaceState(null, '', url);
    }
  }
  search.addEventListener('input', () => render(true));
  category.addEventListener('change', () => render(true));
  sort.addEventListener('change', () => render(true));
  document.querySelector('.directory-search').addEventListener('submit', event => {
    event.preventDefault();
    search.value = directoryQuery.value;
    render(true);
    closeDirectory();
    search.focus();
    document.querySelector('.library-main').scrollTop = 0;
  });
  clear.addEventListener('click', () => {
    search.value = '';
    category.value = '';
    sort.value = 'default';
    render(true);
  });
  render();
})();
