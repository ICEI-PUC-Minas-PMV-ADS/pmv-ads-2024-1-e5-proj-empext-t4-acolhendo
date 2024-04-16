-- Criar o esquema
CREATE SCHEMA IF NOT EXISTS teste;

-- Criar tabela 'usuario'
CREATE TABLE IF NOT EXISTS teste.usuario (
    email VARCHAR PRIMARY KEY,
    senha VARCHAR
);

-- Criar tabela 'empresa'
CREATE TABLE IF NOT EXISTS teste.empresa (
    email VARCHAR,
    telefone VARCHAR,
    instagram VARCHAR,
    facebook VARCHAR,
    youtube VARCHAR,
    chave_pix VARCHAR,
    banco VARCHAR,
    agencia VARCHAR,
    conta VARCHAR,
    cnpj BIGINT,
    nome VARCHAR
);

-- Criar tabela 'galeria'
CREATE TABLE IF NOT EXISTS teste.galeria (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR,
    ativo BOOLEAN DEFAULT FALSE,
    imagem_capa VARCHAR,
    tela_principal BOOLEAN DEFAULT TRUE
);

-- Criar tabela 'galeria_imagem'
CREATE TABLE IF NOT EXISTS teste.galeria_imagem (
    id SERIAL PRIMARY KEY,
    galeria_id INTEGER REFERENCES teste.galeria(id),
    ativo BOOLEAN,
    imagem VARCHAR
);

-- Criar tabela 'banner'
CREATE TABLE IF NOT EXISTS teste.banner (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR,
    ativo BOOLEAN DEFAULT FALSE,
    quantidade_exibicao INTEGER DEFAULT 1
);

-- Criar tabela 'banner_imagem'
CREATE TABLE IF NOT EXISTS teste.banner_imagem (
    id SERIAL PRIMARY KEY,
    banner_id INTEGER REFERENCES teste.banner(id),
    ativo BOOLEAN,
    ordem INTEGER DEFAULT 1,
    imagem_desktop VARCHAR,
    imagem_mobile VARCHAR
);

-- Criar tabela 'artigo'
CREATE TABLE IF NOT EXISTS teste.artigo (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR,
    imagem_capa VARCHAR,
    tipo SMALLINT,
    texto VARCHAR,
    data_inclusao TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir valores de exemplo
INSERT INTO teste.usuario (email, senha) VALUES ('usuario@teste.com', 'senha123');

INSERT INTO teste.empresa (email, telefone, instagram, facebook, youtube, chave_pix, banco, agencia, conta, cnpj, nome)
VALUES ('empresa@teste.com', '123456789', 'instagram.com/empresa', 'facebook.com/empresa', 'youtube.com/empresa', 'chave123', 'Banco Teste', '1234', '56789', 12345678901234, 'Empresa Teste');

INSERT INTO teste.galeria (titulo, imagem_capa) VALUES ('Galeria Teste', 'imagem_galeria.jpg');

INSERT INTO teste.galeria_imagem (galeria_id, ativo, imagem) VALUES (1, true, 'imagem1.jpg');

INSERT INTO teste.banner (titulo) VALUES ('Banner Teste');

INSERT INTO teste.banner_imagem (banner_id, ativo, imagem_desktop, imagem_mobile)
VALUES (1, true, 'imagem_desktop.jpg', 'imagem_mobile.jpg');

INSERT INTO teste.artigo (titulo, imagem_capa, tipo, texto)
VALUES ('Artigo Teste', 'imagem_artigo.jpg', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
VALUES ('Artigo Teste', 'imagem_artigo.jpg', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
VALUES ('Artigo Teste', 'imagem_artigo.jpg', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
VALUES ('Artigo Teste', 'imagem_artigo.jpg', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

