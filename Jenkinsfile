pipeline 
{
    agent any

    stages 
    {

        stage('Sonar Analysis') 
        {
          steps
          {
            echo 'Testing..'
            //  sh 'cd webapp && sudo docker run  --rm -e SONAR_HOST_URL="http://52.66.12.85:9000/" -e SONAR_LOGIN="sqp_d0d19b20d68a420ea2a1f873f756dfa0bf4493c1"  -v ".:/usr/src" sonarsource/sonar-scanner-cli -Dsonar.projectKey=lms'
           }
        }
        stage('Build Lms') 
        {
            steps 
            {
                echo 'Building Artifects..'
                sh 'cd webapp && npm install && npm run build'
            }
        }
       
        stage('Releaseing') 
        {

            steps {
                script
                {
                echo 'Releasing application to nexus...'
                echo 'repeat'
                def packageJSON = readJSON file: 'webapp/package.json'
                def packageJSONVersion = packageJSON.version
                echo "${packageJSONVersion}"
                echo 'Store Artifacts....'
                // sh "echo '${packageJSONVersion}'"
                sh 'sudo rm -rf webapp/*.zip'
                sh "zip webapp/dist-'${packageJSONVersion}'.zip -r webapp/dist"
                sh "curl -v -u admin:shree --upload-file webapp/dist-'${packageJSONVersion}'.zip http://52.66.12.85:8081/repository/lms/" 
                   }   
            }
        }
        stage('Deploy LMS') {
            steps {
                script {
                    echo "Deploying.."       
                    def packageJSON = readJSON file: 'webapp/package.json'
                    def packageJSONVersion = packageJSON.version
                    echo "${packageJSONVersion}"  
                    sh "curl -u admin:shree -X GET \'http://52.66.12.85:8081/repository/lms/dist-${packageJSONVersion}.zip\' --output dist-'${packageJSONVersion}'.zip"
                    sh 'sudo rm -rf /var/www/html/*'
                    sh "sudo unzip -o dist-'${packageJSONVersion}'.zip"
                    sh "sudo mkdir /var/www/html"
                    sh "sudo cp -r webapp/dist/* /var/www/html"
                }
            }
        }

    }
}