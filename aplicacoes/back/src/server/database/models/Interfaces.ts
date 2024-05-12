
export interface IUsuario {
    email: string
    senha: string
}

export interface IEmpresa {
    email: string
    telefone: string
    instagram: string
    facebook: string
    youtube: string
    chave_pix: string
    banco: string
    agencia: string
    conta: string
    cnpj: string
    nome: string
}

export interface IUpdateEmpresa {
    id?: number
    email?: string
    telefone?: string
    instagram?: string
    facebook?: string
    youtube?: string
    chave_pix?: string
    banco?: string
    agencia?: string
    conta?: string
    cnpj?: string
    nome?: string
}

export interface IGaleria {
    id: number
    titulo: string
    ativo: boolean
    imagem_capa: string
    tela_principal: boolean
}

export interface IGaleriaImagem {
    id: number
    galeria_id: number
    ativo: boolean
    imagem: string
}

export interface IBannerImagem {
    id: number
    ativo: boolean
    ordem: number
    imagem_desktop: string
    imagem_mobile: string
}

export interface IArtigo {
    id: number
    titulo: string
    imagem_capa: string
    tipo: number
    texto: string
    data_inclusao: Date
    tela_principal: boolean
}

export interface IUpdateArtigo {
    id: number
    titulo?: string
    imagem_capa?: string
    tipo?: number
    texto?: string
    data_inclusao?: Date
    tela_principal: boolean
}

export interface IUpdateUsuario {
    email: string
}

export interface IUpdateBanner {
    id: number
    ativo?: boolean
    ordem?: number
    imagem_desktop?: string
    imagem_mobile?: string
}

export interface IUpdateGaleria {
    id: number
    titulo?: string
    ativo?: boolean
    imagem_capa?: string
    tela_principal?: boolean
}

export interface ILogin{
    email: string
    senha: string
}

export interface IResetCode{
    id: number
    email: string
    reset_code: string
    requested_date: Date
    expiring_date: Date
    used: boolean
}

export interface IImage {
    id: number
    caminho: string
}