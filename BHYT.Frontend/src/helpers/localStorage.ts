function getFromLocalStorage(variable: string): any {
  const refreshToken = JSON.parse(localStorage.getItem(variable) ?? "{}");
  return refreshToken;
}

function setToLocalStorage(variable: string, data: any): void {
  localStorage.setItem(variable, JSON.stringify(data));
}

export { getFromLocalStorage, setToLocalStorage };
