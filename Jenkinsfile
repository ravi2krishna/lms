pipeline {
    agent any

    stages {
        stage('Sonar Analysis') {
            steps {
                echo 'Testing..'
withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
//sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://13.92.5.110:9000" -e SONAR_LOGIN="sqp_cab9202255bd4cf50f3dbba65bb5aaef79ed00fa"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://3.135.19.45:9000" -e SONAR_LOGIN=$SONAR_TOKEN  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms-app'
         }
         }         
       }
        
        stage('Build LMS') {
            steps {
                echo 'Building Artifacts..'
                sh 'cd webapp && npm install && npm run build'
            }
        }

        stage('Release LMS') {
            steps {
                script {
                def packageJSON = readJSON file: 'webapp/package.json'
                def packageJSONVersion = packageJSON.version
                echo "${packageJSONVersion}"
                echo 'Store Artifacts....'
                sh "zip webapp/dist-'${packageJSONVersion}'.zip -r webapp/dist"
                withCredentials([usernamePassword(credentialsId: 'nexus', usernameVariable: 'NEXUS_USERNAME', passwordVariable: 'NEXUS_PASSWORD')]) {
  sh 'curl -v -u $NEXUS_USERNAME:$NEXUS_PASSWORD --upload-file webapp/dist-'${packageJSONVersion}'.zip http://3.135.19.45:8081/repository/lms/'             
}
               }    
            }
        } 
        
    }
}
