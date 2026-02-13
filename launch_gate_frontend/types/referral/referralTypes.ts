

export type ClickLogType = {
    id: number;
    clicked_at: string;
    source: string | null;
}

export type TrackClickReturnType = {
    success: boolean;
    message?: string;
}

export type referalReturnType = {
    date: string,
    clicks: number
}

export type useReferralStoreType = {
    referralCount: number;
    clickLogs: ClickLogType[];
    fetchReferralData: () => Promise<void>;
    trackClick: (username: string) => Promise<TrackClickReturnType>;
    chartData: DailyStatsType[];
    fetchChartData: () => Promise<referalReturnType[]>;
}

export type DailyStatsType = {
    date: string;
    clicks: number;
};