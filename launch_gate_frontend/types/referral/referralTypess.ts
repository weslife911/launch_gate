

export type ClickLogType = {
    id: number;
    clicked_at: string;
    source: string | null;
}

export type TrackClickReturnType = {
    success: boolean;
    message?: string;
}

export type useReferralStoreType = {
    referralCount: number;
    clickLogs: ClickLogType[];
    isLoading: boolean;
    fetchReferralData: () => Promise<void>;
    trackClick: (username: string) => Promise<TrackClickReturnType>;
}