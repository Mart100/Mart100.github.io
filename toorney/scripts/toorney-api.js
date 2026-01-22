// Mock API for demo mode (works without external API)
const STORAGE_KEY = 'toorney_demo_data_v1'

function _seedData() {
  const data = {
    guilds: {
      'guild1': { name: 'Demo Guild', icon: 'https://via.placeholder.com/64', invite: 'demoInvite' },
      'guild2': { name: 'Another Guild', icon: 'https://via.placeholder.com/64/888', invite: 'anotherInvite' }
    },
    tournaments: {
      't1': {
        id: 't1',
        name: 'SSInternSolos',
        host: 'guild1',
        description: 'A demo tournament showcasing Toorney features.',
        players: {
          'p1': { id: 'p1', username: 'Alice' },
          'p2': { id: 'p2', username: 'Bob' },
          'p3': { id: 'p3', username: 'Carol' }
        },
        status: 'open',
        roundMaxTime: 3,
        autorole: '',
        teams: false,
        forcejoinonly: false,
        admin: 'demo-token'
      },
      't2': {
        id: 't2',
        name: 'CK_Flash_Tournament_Jun17',
        host: 'guild2',
        description: 'Sample seeded tournament.',
        players: {
          'p4': { id: 'p4', username: 'Dave' },
          'p5': { id: 'p5', username: 'Eve' }
        },
        status: 'ongoing',
        roundMaxTime: 5,
        autorole: '',
        teams: false,
        forcejoinonly: false,
        admin: 'demo-token'
      }
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  return data
}

function _loadData() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return _seedData()
  try { return JSON.parse(raw) } catch(e) { return _seedData() }
}

function _saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }

function _simulate(data, ms = 150) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

function getTournaments() {
  const data = _loadData()
  return _simulate(data.tournaments)
}

function getGuilds() {
  const data = _loadData()
  return _simulate(data.guilds)
}

function startTournament(token, tournamentId) {
  const data = _loadData()
  const t = data.tournaments[tournamentId]
  if (t) {
    t.status = 'ongoing'
    _saveData(data)
    return _simulate({ success: true, tournament: t })
  }
  return _simulate({ success: false, error: 'Not found' })
}

function resetTournament(token, tournamentId) {
  const data = _loadData()
  const t = data.tournaments[tournamentId]
  if (t) {
    t.status = 'open'
    // keep players but reset other tournament-specific state if needed
    _saveData(data)
    return _simulate({ success: true, tournament: t })
  }
  return _simulate({ success: false, error: 'Not found' })
}

function deleteTournament(token, tournamentId) {
  const data = _loadData()
  if (data.tournaments[tournamentId]) {
    delete data.tournaments[tournamentId]
    _saveData(data)
    return _simulate({ success: true })
  }
  return _simulate({ success: false, error: 'Not found' })
}

function shuffleTournament(token, tournamentId) {
  const data = _loadData()
  const t = data.tournaments[tournamentId]
  if (t) {
    const players = Object.values(t.players || {})
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[players[i], players[j]] = [players[j], players[i]]
    }
    // rebuild players object to reflect new insertion order
    const newPlayers = {}
    for (const p of players) newPlayers[p.id] = p
    t.players = newPlayers
    _saveData(data)
    return _simulate({ success: true, tournament: t })
  }
  return _simulate({ success: false, error: 'Not found' })
}

function finishTournament(token, tournamentId) {
  const data = _loadData()
  const t = data.tournaments[tournamentId]
  if (t) {
    t.status = 'finished'
    _saveData(data)
    return _simulate({ success: true, tournament: t })
  }
  return _simulate({ success: false, error: 'Not found' })
}

function getAdminTournaments(user) {
  const data = _loadData()
  // If a demo token is provided, return all tournaments where admin matches or return all as fallback
  const results = {}
  for (const id in data.tournaments) {
    const t = data.tournaments[id]
    if (!user || t.admin === user) results[id] = t
  }
  return _simulate(results)
}

// Expose a helper for resetting demo data from console: window.resetToorneyDemo()
window.resetToorneyDemo = function() { localStorage.removeItem(STORAGE_KEY); return _seedData() }

function saveTournament(token, tournament) {
  const data = _loadData()
  if (!tournament || !tournament.id) return _simulate({ success: false, error: 'missing id' })
  // merge existing tournament fields (preserve players unless overwritten)
  const existing = data.tournaments[tournament.id] || {}
  data.tournaments[tournament.id] = Object.assign({}, existing, tournament)
  _saveData(data)
  return _simulate({ success: true, tournament: data.tournaments[tournament.id] })
}