pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Testing..'
            }
        }

        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'
            }
        }

        stage('Release') {
            steps {
                echo 'Building..'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}