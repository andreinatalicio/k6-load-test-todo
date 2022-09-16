# considerations

- Cenários:
  - Foram mapeados e implementados os cenários de sucesso das API's disponibilizadas, pois nesse tipo de teste o ideal é validar a capacidade da aplicação e não o seu comportamento funcional (este deve ser validado por outros tipos de testes).
- Implementação:
  - Testes implementados para serem independentes da massa de dados, ou seja, todo o setup necessário para cada teste é feito antes de sua execução;
  - Através do arquivo env.js, é possível definir as métricas dos testes (usuários virtuais e duração de cada execução).
- Pacotes:
  - k6 (ferramenta para testes de carga);
  - eslint (padronização da escrita de código).
- Pontos de melhorias:
  - Devido à necessidade de criar testes independentes, o tempo de setup para alguns cenários acaba sendo um pouco maior. Uma forma de facilitar e otimizar isso seria, por exemplo, dispor de endpoints tanto para a criação de novos usuários, quanto para a geração de tokens, evitando assim o uso de token válido fixo no arquivo de variáveis de ambiente.
