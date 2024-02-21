pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'cat /etc/os-release'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'free'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'sudo docker container ls'
            }
        }
    }
}
