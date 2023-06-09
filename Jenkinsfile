pipeline {
    agent any

    stages {
        stage('sonar analysis') {
            steps {
                echo 'testing..'
                sh 'whoami'
                sh 'sudo apt update -y'
            }
        }

        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'
            }
        }
        stage('release') {
            steps {
                echo 'building..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}