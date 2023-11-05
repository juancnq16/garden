pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Git Checkout') {
            steps {
                script {
                    git branch: 'main',
                        credentialsId: 'git-auth-0',
                        url: 'https://github.com/juancnq16/garden.git'
                }
                
            }
        }
        stage('Build'){
            steps{
                dir('gui/garden-app') {
                    sh 'npm install'
                    sh 'ng build'
                    sh 'cp -r dist/garden-app/* ../../src/main/resources/static'
                    /* execute commands in the scripts directory */
                }
                /*
                sh 'pwd'
                sh 'cd ./gui/garden-app'
                sh 'ls'
                sh 'ng build'
                sh 'cp -r dist/garden-app/* ../../src/main/resources/static'
                sh 'cd ../..'
                */
                //
            }
        }
        stage('Pack'){
            steps{
                sh 'pwd'
                sh 'rm -f target/*.war '
                sh 'mvn package'
                sh 'mv target/*.war target/garden.war'
            }
        }
        stage('Deploy'){
            steps{
                withCredentials([sshUserPrivateKey(credentialsId: 'aws-1', keyFileVariable: 'MY_SSH_KEY')]) {
                    sh 'scp -v -i $MY_SSH_KEY target/garden.war ec2-user@3.139.234.131:~/docker/'
                    sh '''ssh -i $MY_SSH_KEY ec2-user@3.139.234.131 'cd docker &&  sh cleanup.sh' '''
                    sh '''ssh -i $MY_SSH_KEY ec2-user@3.139.234.131 'cd docker && docker build -t customcat .' '''
                    sh '''ssh -i $MY_SSH_KEY ec2-user@3.139.234.131 'docker run -d --name customcat -p 8080:8080 customcat' '''
                }
                /*
                sshagent(credentials:['as']) {
                    // some block ssh dockeradmin@18.217.167.217  'whoami' 
                    //sh "ssh -o StrictHostKeyChecking=no dockeradmin@3.139.234.131 'whoami' "
                    //sh "whoami"
                    sh 'scp -v -o StrictHostKeyChecking=no target/garden.war dockeradmin@3.139.234.131:/opt/docker'
                }
                */
            }
        }
    }
}
