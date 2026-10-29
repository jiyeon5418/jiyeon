const categories = {
  daily: { label: '일상', color: '일상' },
  work: { label: '일과 배움', color: '일과 배움' },
  reading: { label: '책과 문장', color: '책과 문장' },
  travel: { label: '여행', color: '여행' },
  thoughts: { label: '생각', color: '생각' },
  archive: { label: '작은 발견', color: '작은 발견' }
};

// 아래 샘플 글을 편집하거나 복사해 나만의 글을 추가하세요.
const posts = [
  { category: 'daily', date: '2026.10.24', title: '아무것도 하지 않는 토요일의 기쁨', excerpt: '알람 없이 눈을 뜨고, 천천히 내린 커피를 마시며 창밖을 바라봤다.' },
  { category: 'work', date: '2026.10.18', title: '작은 습관이 하루를 바꾸는 방식', excerpt: '매일 조금씩 배우고 기록하는 일은 생각보다 단단한 힘이 된다.' },
  { category: 'reading', date: '2026.10.12', title: '마음에 오래 머무는 문장들', excerpt: '좋은 문장을 만난 날에는 책을 덮고도 한참 동안 그 자리에 머문다.' },
  { category: 'travel', date: '2026.10.05', title: '바다가 보고 싶어 떠난 작은 여행', excerpt: '계획을 조금 비워두니 우연히 만난 풍경이 더 선명하게 남았다.' },
  { category: 'thoughts', date: '2026.09.28', title: '나만의 속도로 걷는다는 것', excerpt: '다른 사람의 속도를 따라가지 않아도 괜찮다는 걸 요즘 배우는 중이다.' },
  { category: 'archive', date: '2026.09.20', title: '오늘 발견한 사소하고 좋은 것', excerpt: '오후 햇빛이 책상 위에 놓인 작은 화병을 오래 비추던 순간.' }
];

const list = document.querySelector('#post-list');
const searchInput = document.querySelector('#search');
const filterLabel = document.querySelector('#filter-label');
const clearFilter = document.querySelector('#clear-filter');
const emptyState = document.querySelector('#empty-state');
const showingCount = document.querySelector('#showing-count');
let selectedCategory = 'all';

function renderPosts() {
  const query = searchInput.value.trim().toLocaleLowerCase('ko');
  const visible = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = !query || `${post.title} ${post.excerpt} ${categories[post.category].label}`.toLocaleLowerCase('ko').includes(query);
    return matchesCategory && matchesSearch;
  });

  list.innerHTML = visible.map((post) => `
    <a class="post-row" href="mailto:hello@example.com?subject=${encodeURIComponent(post.title)}" aria-label="${post.title} (샘플 글, 편집 후 공개하세요)">
      <span class="post-category">${categories[post.category].label}</span>
      <span class="post-copy"><span class="post-title">${post.title}</span><span class="post-excerpt">${post.excerpt}</span></span>
      <span class="post-date">${post.date}</span><span class="post-arrow" aria-hidden="true">↗</span>
    </a>`).join('');

  const categoryText = selectedCategory === 'all' ? '모든 기록' : categories[selectedCategory].label;
  filterLabel.textContent = query ? `${categoryText} · 검색: “${searchInput.value.trim()}”` : categoryText;
  clearFilter.hidden = selectedCategory === 'all' && !query;
  emptyState.hidden = visible.length > 0;
  showingCount.textContent = String(visible.length).padStart(2, '0');
}

document.querySelectorAll('.category-card').forEach((card) => {
  card.addEventListener('click', () => {
    selectedCategory = card.dataset.category;
    document.querySelectorAll('.category-card').forEach((item) => item.classList.toggle('selected', item === card));
    renderPosts();
    document.querySelector('#posts').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

searchInput.addEventListener('input', renderPosts);
clearFilter.addEventListener('click', () => {
  selectedCategory = 'all';
  searchInput.value = '';
  document.querySelectorAll('.category-card').forEach((card) => card.classList.toggle('selected', card.dataset.category === 'all'));
  renderPosts();
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    renderPosts();
    searchInput.blur();
  }
});

renderPosts();
