import Promise from 'ts-promise';
import {LeBusinessLogicServicesInterface} from '@castle/le-business-logic';

class <%= pascalCaseJobClassName %> {
  constructor (private services) {
  }

  public run (job:any, complete:()=>void): Promise<any> {
    return this.services.jobService.handleJob(job, complete,(job)=>{
      return this.perform<%= pascalCaseJobClassName %>(job);
    });
  }

  private perform<%= pascalCaseJobClassName %>(job:any):Promise<any> {
    return Promise.resolve(job);
  }
}

module.exports = <%= pascalCaseJobClassName %>;
