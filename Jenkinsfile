pipeline {
    agent {
        node {
            env.NODEJS_HOME = "${tool 'Node 21.x'}"
            // on linux / mac
            env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
            sh 'npm --version'
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                nodejs('v21.7.2') {
                    sh 'npm install'
                }
                echo 'download done'
                nodejs('v21.7.2') {
                    sh 'npm run build-v'
                }
                echo 'build done'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'cp -r ./dist /var/www/html/csc'
                echo 'copy done'
            }
        }
    }
}