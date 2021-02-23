pipeline {
    agent {
        docker {
          image 'node:10.17.0'
        }
      }

   stages{
    stage('build') {
     
      steps {
        node('worker') {
        sh "npm install"
        sh "npm run build"
      }
      }
    }

    stage('deploy') {
      steps {
        node ('master') {
        sh "node web"
     }
      }
    }
   }
}