import Papa from 'papaparse';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Match } from './types';
import { eventCategories } from './event-categories';

export function exportMatchToCSV(match: Match) {
  // Prepare data for CSV
  const csvData = match.events.map(event => {
    const eventDetails = eventCategories
      .flatMap(cat => cat.events)
      .find(e => e.type === event.type);
    
    const teamName = event.team === 'home' ? match.homeTeam : match.awayTeam;
    const playerInfo = event.player ? `${event.player.name} (#${event.player.number})` : '';
    
    const matchMinutes = Math.floor(event.matchTime / 60);
    const matchSeconds = event.matchTime % 60;
    
    return {
      'Temps du match': `${matchMinutes}:${matchSeconds.toString().padStart(2, '0')}`,
      'Mi-temps': match.half === 1 ? '1ère' : '2ème',
      'Heure réelle': format(new Date(event.timestamp), 'HH:mm:ss', { locale: fr }),
      'Équipe': teamName,
      'Type d\'événement': eventDetails?.label || event.type,
      'Joueur': playerInfo,
      'Points': event.points || 0,
      'Description': event.description || '',
      'Score après action': event.team === 'home' 
        ? `${match.homeScore} - ${match.awayScore}`
        : `${match.homeScore} - ${match.awayScore}`,
    };
  });

  // Add match summary at the beginning
  const summary = {
    'Temps du match': 'RÉSUMÉ',
    'Mi-temps': '',
    'Heure réelle': format(new Date(), 'dd/MM/yyyy HH:mm', { locale: fr }),
    'Équipe': `${match.homeTeam} vs ${match.awayTeam}`,
    'Type d\'événement': 'Score final',
    'Joueur': '',
    'Points': '',
    'Description': `${match.homeScore} - ${match.awayScore}`,
    'Score après action': '',
  };

  const allData = [summary, ...csvData];

  // Convert to CSV
  const csv = Papa.unparse(allData, {
    quotes: true,
    delimiter: ',',
    header: true,
  });

  // Create and download file
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const fileName = `match_rugby_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportDetailedStats(match: Match) {
  // Prepare detailed statistics
  const homeStats = {
    team: match.homeTeam,
    score: match.homeScore,
    tries: match.events.filter(e => e.type === 'try' && e.team === 'home').length,
    conversions: match.events.filter(e => e.type === 'conversion' && e.team === 'home').length,
    penalties: match.events.filter(e => e.type === 'penalty_goal' && e.team === 'home').length,
    drops: match.events.filter(e => e.type === 'drop_goal' && e.team === 'home').length,
    yellowCards: match.events.filter(e => e.type === 'yellow_card' && e.team === 'home').length,
    redCards: match.events.filter(e => e.type === 'red_card' && e.team === 'home').length,
    scrums: match.events.filter(e => e.type === 'scrum' && e.team === 'home').length,
    lineouts: match.events.filter(e => e.type === 'lineout' && e.team === 'home').length,
    turnovers: match.events.filter(e => e.type === 'turnover' && e.team === 'home').length,
  };

  const awayStats = {
    team: match.awayTeam,
    score: match.awayScore,
    tries: match.events.filter(e => e.type === 'try' && e.team === 'away').length,
    conversions: match.events.filter(e => e.type === 'conversion' && e.team === 'away').length,
    penalties: match.events.filter(e => e.type === 'penalty_goal' && e.team === 'away').length,
    drops: match.events.filter(e => e.type === 'drop_goal' && e.team === 'away').length,
    yellowCards: match.events.filter(e => e.type === 'yellow_card' && e.team === 'away').length,
    redCards: match.events.filter(e => e.type === 'red_card' && e.team === 'away').length,
    scrums: match.events.filter(e => e.type === 'scrum' && e.team === 'away').length,
    lineouts: match.events.filter(e => e.type === 'lineout' && e.team === 'away').length,
    turnovers: match.events.filter(e => e.type === 'turnover' && e.team === 'away').length,
  };

  const statsData = [
    {
      'Statistique': 'Équipe',
      [match.homeTeam]: homeStats.team,
      [match.awayTeam]: awayStats.team,
    },
    {
      'Statistique': 'Score final',
      [match.homeTeam]: homeStats.score,
      [match.awayTeam]: awayStats.score,
    },
    {
      'Statistique': 'Essais',
      [match.homeTeam]: homeStats.tries,
      [match.awayTeam]: awayStats.tries,
    },
    {
      'Statistique': 'Transformations',
      [match.homeTeam]: homeStats.conversions,
      [match.awayTeam]: awayStats.conversions,
    },
    {
      'Statistique': 'Pénalités',
      [match.homeTeam]: homeStats.penalties,
      [match.awayTeam]: awayStats.penalties,
    },
    {
      'Statistique': 'Drops',
      [match.homeTeam]: homeStats.drops,
      [match.awayTeam]: awayStats.drops,
    },
    {
      'Statistique': 'Cartons jaunes',
      [match.homeTeam]: homeStats.yellowCards,
      [match.awayTeam]: awayStats.yellowCards,
    },
    {
      'Statistique': 'Cartons rouges',
      [match.homeTeam]: homeStats.redCards,
      [match.awayTeam]: awayStats.redCards,
    },
    {
      'Statistique': 'Mêlées',
      [match.homeTeam]: homeStats.scrums,
      [match.awayTeam]: awayStats.scrums,
    },
    {
      'Statistique': 'Touches',
      [match.homeTeam]: homeStats.lineouts,
      [match.awayTeam]: awayStats.lineouts,
    },
    {
      'Statistique': 'Turnovers',
      [match.homeTeam]: homeStats.turnovers,
      [match.awayTeam]: awayStats.turnovers,
    },
  ];

  // Convert to CSV
  const csv = Papa.unparse(statsData, {
    quotes: true,
    delimiter: ',',
    header: true,
  });

  // Create and download file
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const fileName = `stats_rugby_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}