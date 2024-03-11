export interface Language {
  id: number;
  name: string;
  is_archived: boolean;
  source_file: string;
  compile_cmd: string | null;
  run_cmd: string | null;
}
