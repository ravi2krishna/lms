pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Sonar Analysis'
                sh 'npm -v'
            }
        }    

        stage('Build & Release') {
            steps {
                echo 'Building'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}