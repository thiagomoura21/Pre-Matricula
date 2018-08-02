angular.module('app')
    .controller('UserDataController', function ($scope, $rootScope, $location, AuthService, UserService,$http) {


        if (UserService.isCordinator()) $location.path('/addCourse');

        $rootScope.activetab = $location.path();
        $rootScope.user_email = AuthService.getUserDetails().email;
        UserService.getMatricula().then(function (value) {
            $scope.matricula_usuario = value;
        });

        $scope.curso = UserService.getCurso();


        $scope.send = function send() {


            usuario = {
                matricula: $scope.matricula_usuario,
                nome: UserService.getName(),
                email: UserService.getEmail(),
                periodoEntrada: "20" + $scope.matricula_usuario.slice(1, 3) + "." + $scope.matricula_usuario.slice(3, 4),
                preMatricula: {}
            };

            $http.post('http://prematriculabackend.herokuapp.com/api/aluno', usuario).
            then(function (response) {

                if (response.status == 200) {
                    window.alert("Usuario atualizado com Sucesso!");
                    $location.path("/userdata");
                }

                else {
                    window.alert("Falha ao Atualizar dados!");
                    $location.path("/userdata");
                }



            })

        }


        $scope.validaMatricula = function () {
            matricula = $scope.matricula_usuario;
            return !isNaN(matricula);
        }



    });

