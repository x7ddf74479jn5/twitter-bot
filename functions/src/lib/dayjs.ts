import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import timezone from "dayjs/plugin/timezone";

dayjs.locale(ja);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export type { Dayjs } from "dayjs";

export default dayjs;
