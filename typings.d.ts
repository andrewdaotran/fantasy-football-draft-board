import { ReactNode } from "react";

export type ChildrenNodeType = { children: ReactNode };

export interface APITypes {
  injury_status: boolean;
  sport: string;
  team: string;
  fantasy_data_id: number;
  years_exp: number;
  active: boolean;
  depth_chart_order: number;
  search_last_name: string;
  swish_id: number;
  college: string;
  competitions: Array;
  oddsjam_id: number;
  player_id: number;
  rotowire_id: number;
  team_abbr: string;
  weight: string;
  gsis_id: string;
  injury_start_date: string;
  status: string;
  stats_id: number;
  age: number;
  fantasy_positions: [string];
  depth_chart_position: string;
  birth_state: string;
  full_name: string;
  metadata: object;
  rotoworld_id: number;
  espn_id: number;
  practice_description: string;
  news_updated: string;
  pandascore_id: number;
  first_name: string;
  birth_country: string;
  hashtag: string;
  team_changed_at: string;
  birth_city: string;
  birth_date: string;
  last_name: string;
  search_full_name: string;
  opta_id: number;
  sportradar_id: string;
  high_school: string;
  position: string;
  search_rank: number;
  injury_notes: string;
  yahoo_id: number;
  practice_participation: string;
  number: number;
  height: string;
  search_first_name: string;
  injury_body_part: string;
  positionIndex?: number;
}

export interface PlayerSearch {
  playerName: string;
  playerPosition: string;
}

export interface PositionRanksList {
  id: string;
  positionRanks: APITypes[];
  createdBy: string;
  title: string;
}
