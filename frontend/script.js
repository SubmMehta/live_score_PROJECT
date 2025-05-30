fetch('http://localhost:3000/matches')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('matches-list');
    container.innerHTML = '';

    data.forEach(match => {
      const card = document.createElement('div');
      card.className = 'match-card';
      card.innerHTML = `
        <div class="match-header">
          <span class="teams">${match.homeTeam} vs ${match.awayTeam}</span>
        </div>
        <div class="time">⏰ ${new Date(match.date).toLocaleString()}</div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById('matches-list').innerHTML = '<p>Error loading matches.</p>';
    console.error(err);
  });
