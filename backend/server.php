<?php

require 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $input = file_get_contents('php://input');
    
    $data = json_decode($input, true);

    $id = $data['id'];
    $nome = $data['nome'];
    $dataNascimento = $data['dataNascimento'];
    $telefone = $data['telefone'];
    $profissao = $data['profissao'];
    $email = $data['email'];
    $celular = $data['celular'];
    $whatsapp = $data['whatsapp'];
    $notificacoesEmail = $data['notificacoesEmail'];
    $notificacoesSms = $data['notificacoesSms'];

    $stmt = $mysqli->prepare("INSERT INTO dadoscadastrados (id, nome, dataNascimento, telefone, profissao, email, celular, whatsapp, notificacoesEmail, notificacoesSms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssss", $id, $nome, $dataNascimento, $telefone, $profissao, $email, $celular, $whatsapp, $notificacoesEmail, $notificacoesSms);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'Contato inserido']);
    } else {
        echo json_encode(['error' => 'Falha ao inserir contato.']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $input = file_get_contents('php://input');
    
    $data = json_decode($input, true);
    $id = $data['id'];
    
    $stmt = $mysqli->prepare("DELETE FROM dadoscadastrados WHERE id = ?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'Contato excluído']);
    } else {
        echo json_encode(['error' => 'Falha ao excluir contato.']);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    $input = file_get_contents('php://input');
    
    $data = json_decode($input, true);

    $id = $data['id'];
    $nome = $data['nome'];
    $dataNascimento = $data['dataNascimento'];
    $telefone = $data['telefone'];
    $profissao = $data['profissao'];
    $email = $data['email'];
    $celular = $data['celular'];
    $whatsapp = $data['whatsapp'];
    $notificacoesEmail = $data['notificacoesEmail'];
    $notificacoesSms = $data['notificacoesSms'];

    $stmt = $mysqli->prepare("UPDATE dadoscadastrados SET nome = ?, dataNascimento = ?, telefone = ?, profissao = ?, email = ?, celular = ?, whatsapp = ?, notificacoesEmail = ?, notificacoesSms = ? WHERE id = ?");
    $stmt->bind_param("ssssssssss", $nome, $dataNascimento, $telefone, $profissao, $email, $celular, $whatsapp, $notificacoesEmail, $notificacoesSms, $id);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'Contato atualizado']);
    } else {
        echo json_encode(['error' => 'Falha ao atualizar contato.']);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $input = file_get_contents('php://input');

    $stmt = $mysqli->prepare("SELECT * FROM dadoscadastrados");
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $dados = [];

        while ($row = $result->fetch_assoc()) {
            $dados[] = $row;
        }

        echo json_encode($dados);
    } else {

        echo json_encode(['message' => 'Nenhum dado encontrado.']);
    }
}


?>