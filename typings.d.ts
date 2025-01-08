import { ReactNode } from "react";

export type ChildrenNodeType = { children: ReactNode };

export interface APITypes {
  injury_status: boolean;
  sport: String;
  team: String;
  fantasy_data_id: Number;
  years_exp: Number;
  active: Boolean;
  depth_chart_order: Number;
  search_last_name: String;
  swish_id: Number;
  college: String;
  competitions: Array;
  oddsjam_id: Number;
  player_id: Number;
  rotowire_id: Number;
  team_abbr: String;
  weight: String;
  gsis_id: String;
  injury_start_date: String;
  status: String;
  stats_id: Number;
  age: Number;
  fantasy_positions: [String];
  depth_chart_position: String;
  birth_state: String;
  full_name: String;
  metadata: Object;
  rotoworld_id: Number;
  espn_id: Number;
  practice_description: String;
  news_updated: String;
  pandascore_id: Number;
  first_name: String;
  birth_country: String;
  hashtag: String;
  team_changed_at: String;
  birth_city: String;
  birth_date: String;
  last_name: String;
  search_full_name: String;
  opta_id: Number;
  sportradar_id: String;
  high_school: String;
  position: String;
  search_rank: Number;
  injury_notes: String;
  yahoo_id: Number;
  practice_participation: String;
  number: Number;
  height: String;
  search_first_name: String;
  injury_body_part: String;
}

export interface PlayerSearch {
  playerName: String;
  playerPosition: String;
}
