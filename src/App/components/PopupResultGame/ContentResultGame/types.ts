export type ContentResultGameProps = {
    scores: number;
    words: string[];
    onClickBreak: () => void; 
    onClickContinue: ()=>void;
}

export type TableResultGameProps = {
    scores: number;
    words: string[];
}