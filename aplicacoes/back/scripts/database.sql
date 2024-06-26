-- Criar o esquema
CREATE SCHEMA IF NOT EXISTS teste;

-- Criar tabela 'usuario'
CREATE TABLE IF NOT EXISTS teste.usuario (
    email VARCHAR PRIMARY KEY,
    senha VARCHAR
);

-- Criar tabela 'empresa'
CREATE TABLE IF NOT EXISTS teste.empresa (
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    telefone VARCHAR,
    instagram VARCHAR,
    facebook VARCHAR,
    youtube VARCHAR,
    chave_pix VARCHAR,
    banco VARCHAR,
    agencia VARCHAR,
    conta VARCHAR,
    cnpj VARCHAR,
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
    imagem VARCHAR,
    descricao VARCHAR
);

-- Criar tabela 'banner_imagem'
CREATE TABLE IF NOT EXISTS teste.banner_imagem (
    id SERIAL PRIMARY KEY,
    ativo BOOLEAN,
    ordem INTEGER DEFAULT 1,
    imagem_desktop VARCHAR,
    imagem_mobile VARCHAR,
    descricao VARCHAR
);

-- Criar tabela 'artigo'
CREATE TABLE IF NOT EXISTS teste.artigo (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR,
    imagem_capa VARCHAR,
    tipo SMALLINT,
    texto VARCHAR,
    data_inclusao TIMESTAMPTZ DEFAULT NOW(),
    tela_principal BOOLEAN DEFAULT TRUE
);

-- Criar tabela de reset code
CREATE TABLE teste.reset_code (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    reset_code CHAR(6) NOT NULL,
    requested_date TIMESTAMP NOT NULL,
    expiring_date TIMESTAMP NOT NULL,
    used bool NOT NULL
);

-- Inserir valores de exemplo
INSERT INTO teste.usuario (email, senha) VALUES ('usuario@teste.com', 'senha123');

INSERT INTO teste.empresa (email, telefone, instagram, facebook, youtube, chave_pix, banco, agencia, conta, cnpj, nome)
VALUES ('empresa@teste.com', '123456789', 'instagram.com/empresa', 'facebook.com/empresa', 'youtube.com/empresa', 'chave123', 'Banco Teste', '1234', '56789', '12345678901234', 'Empresa Teste');

INSERT INTO teste.galeria (titulo, imagem_capa) VALUES ('Galeria Teste', 'imagem_galeria.jpg');
INSERT INTO teste.galeria (titulo, imagem_capa) VALUES ('Galeria Teste 2', 'imagem_galeria2.jpg');
INSERT INTO teste.galeria (titulo, imagem_capa) VALUES ('Galeria Teste 3', 'imagem_galeria3.jpg');

INSERT INTO teste.galeria_imagem (galeria_id, ativo, imagem) VALUES (1, true, 'imagem1.jpg');

INSERT INTO teste.banner_imagem (ativo, imagem_desktop, imagem_mobile)
VALUES (true, 'imagem_desktop.jpg', 'imagem_mobile.jpg'),
       (true, 'imagem_desktop.jpg', 'imagem_mobile.jpg'),
       (true, 'imagem_desktop.jpg', 'imagem_mobile.jpg');

INSERT INTO teste.artigo (titulo, imagem_capa, tipo, texto)
VALUES ('Artigo Teste', 'imagem_artigo.jpg', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
       ('Artigo Teste', 'imagem_artigo.jpg', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
       ('Artigo Teste', 'imagem_artigo.jpg', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
       ('Artigo Teste', 'imagem_artigo.jpg', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
