export interface annoncesProps  {
    key: string,
    title: string,
    text: string,
    type?: "Exclusifs" | "Présentation",
    category:"éphémères" | "perpétuelles"
    data: any
}