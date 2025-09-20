"use client";

import { MatchTimer } from '@/components/match/MatchTimer';
import { ScoreBoard } from '@/components/match/ScoreBoard';
import { EventButtons } from '@/components/match/EventButtons';
import { EventsList } from '@/components/match/EventsList';
import { LiveStats } from '@/components/match/LiveStats';
import { Button } from '@/components/ui/button';
import { useMatchStore } from '@/lib/store';
import { exportMatchToCSV, exportDetailedStats } from '@/lib/csv-export';
import { RefreshCw, FileText, BarChart } from 'lucide-react';

	export default function CollectifPage() {
		const { match, resetMatch } = useMatchStore();

		const handleExportCSV = () => {
			if (match.events.length === 0) {
				alert('Aucun événement à exporter');
				return;
			}
			exportMatchToCSV(match);
		};

		const handleExportStats = () => {
			if (match.events.length === 0) {
				alert('Aucun événement à exporter');
				return;
			}
			exportDetailedStats(match);
		};

		const handleResetMatch = () => {
			if (confirm('Êtes-vous sûr de vouloir réinitialiser le match ? Toutes les données seront perdues.')) {
				resetMatch();
			}
		};

		return (
		<div className="min-h-screen bg-background p-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold">Rugby Match Monitor (Collectif)</h1>
							<p className="text-sm sm:text-base text-muted-foreground">
								Enregistrez tous les événements du match en temps réel
							</p>
						</div>
						<div className="flex flex-wrap gap-2">
							<Button
								onClick={handleExportCSV}
								variant="outline"
								size="sm"
								disabled={match.events.length === 0}
								className="flex-1 sm:flex-initial"
							>
								<FileText className="mr-2 h-4 w-4" />
								<span className="hidden sm:inline">Export</span> CSV
							</Button>
							<Button
								onClick={handleExportStats}
								variant="outline"
								size="sm"
								disabled={match.events.length === 0}
								className="flex-1 sm:flex-initial"
							>
								<BarChart className="mr-2 h-4 w-4" />
								<span className="hidden sm:inline">Export</span> Stats
							</Button>
							<Button
								onClick={handleResetMatch}
								variant="destructive"
								size="sm"
								className="flex-1 sm:flex-initial"
							>
								<RefreshCw className="mr-2 h-4 w-4" />
								<span className="hidden sm:inline">Nouveau</span> Match
							</Button>
						</div>
					</div>
				</div>

				{/* Main grid layout */}
				<div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
					{/* Left column - Timer and Score */}
					<div className="space-y-6 lg:col-span-1">
						<MatchTimer />
						<ScoreBoard />
					</div>

					{/* Middle column - Event buttons */}
					<div className="lg:col-span-1">
						<EventButtons />
					</div>

					{/* Right column - Live stats and Events list */}
					<div className="lg:col-span-1">
						<LiveStats />
						<EventsList />
					</div>
				</div>

				{/* Footer */}
				<div className="mt-8 text-center text-sm text-muted-foreground">
					<p>
						Les données sont automatiquement sauvegardées localement. 
						Exportez régulièrement vos données en CSV pour les conserver.
					</p>
				</div>
			</div>
		</div>
		);
	}
