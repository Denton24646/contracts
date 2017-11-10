import {Token} from './types';
import {ContractInstance} from './types';

export class TokenRegGovWrapper {
  private tokenRegGov: ContractInstance;
  constructor(tokenRegGovContractInstance: ContractInstance) {
    this.tokenRegGov = tokenRegGovContractInstance;
  }
  public async addTokenAsync(token: Token, from: string) {
    const tokenRegGovOwner = await this.tokenRegGov.owner.call();
    console.log('tokenRegGov Owner (in wrapper): ', tokenRegGovOwner);

    const tx = await this.tokenRegGov.addToken(
      token.address,
      token.name,
      token.symbol,
      token.decimals,
      token.ipfsHash,
      token.swarmHash,
      {from},
    );
    return tx;
  }
  public async getTokenMetaDataAsync(tokenAddress: string) {
    const data = await this.tokenRegGov.getTokenMetaData(tokenAddress);
    const token: Token = {
      address: data[0],
      name: data[1],
      symbol: data[2],
      decimals: data[3].toNumber(),
      ipfsHash: data[4],
      swarmHash: data[5],
    };
    return token;
  }
  public async getTokenByNameAsync(tokenName: string) {
    const data = await this.tokenRegGov.getTokenByName(tokenName);
    const token: Token = {
      address: data[0],
      name: data[1],
      symbol: data[2],
      decimals: data[3].toNumber(),
      ipfsHash: data[4],
      swarmHash: data[5],
    };
    return token;
  }
  public async getTokenBySymbolAsync(tokenSymbol: string) {
    const data = await this.tokenRegGov.getTokenBySymbol(tokenSymbol);
    const token: Token = {
      address: data[0],
      name: data[1],
      symbol: data[2],
      decimals: data[3].toNumber(),
      ipfsHash: data[4],
      swarmHash: data[5],
    };
    return token;
  }
}